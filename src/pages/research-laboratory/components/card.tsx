import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { useDataContext } from '@/utils/context/DataContext';
import { validateResources } from '@/utils/validate/validates';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { CardHeader, ConfirmModal } from '@/components/card/cardItem';
import { basicData } from '@/utils/database/data';
import { calculateResources, calculateResourceUpdates, calculateTime, formatTime, handleCancelBuildingFlag, updateAfterBuilding, updateStartTime } from '@/utils/function/function';

import Lab_img_1 from '/assets/labs/lab-1.png';
import Lab_img_2 from '/assets/labs/lab-2.png';
import Lab_img_3 from '/assets/labs/lab-3.png';


const Resource = ({ value, icon, color = '' }: { value: string; icon: string, color?: string }) => (
	<div className='flex gap-x-[10px] items-center'>
		<p className={`${color}`}>{value}</p>
		<img src={icon} alt='' />
	</div>
)

const icons = [
	'./metal-plate.svg',
	'./substrate.svg',
	'./moisture.svg',
	'./deuterium.svg',
	'./energy.svg',
]

const CardContent = ({ category, img, level, time, state, isValid, item, isProgress, isBuilding }: any) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='flex items-center'>
			<div className='flex items-center'>
				<img src={img} alt='' className='w-[135px] h-[135px]' />
				<div className='text-xs font-normal flex flex-col gap-y-4 w-[55%] ml-[38px]'>
					<p>
						Improves the energy supply and is therefore a prerequisite for many
						Ships, buildings or research.
					</p>
					<div className='flex flex-row gap-2 items-center'>
						<p>Research time: {time}</p>
						<Timer />
					</div>
				</div>
			</div>
			<div className='flex gap-x-[48px] items-center w-[30%] text-xs font-normal'>
				{
					Object.values(state?.conditions).map((resource: any, index: number) => (
						(resource !== 0 && <Resource key={index} value={calculateResources(resource, state?.factor, level).toLocaleString()} icon={icons[index]} color={!isValid?.[index] ? 'text-[red]' : ''} />)
					))
				}
				<div className={`text-center ${isBuilding ? 'text-[#05ff00]' : ''}`}>
					<p>
						<Popover open={isOpen} onOpenChange={setIsOpen}>
							{
								!isProgress && isValid ?
									<PopoverTrigger>
										Research
									</PopoverTrigger> :
									<>
										{isBuilding ? 'Researching' : 'Research'}
									</>
							}
							<ConfirmModal category={category} time={time} onCancel={() => setIsOpen(false)} item={item} />
						</Popover>
					</p>
					[Stage {level + 1}]
				</div>
			</div>
		</div>
	)
}

const Card = ({ category, isProgress, additionalData, currentResources, isValid, defaultData }: any) => {
	const { data, updateData } = useDataContext();
	//@ts-ignore
	const dynamicData = data?.categories?.[category]?.[additionalData?.item];
	const [remainingTime, setRemainingTime] = useState(formatTime(defaultData?.requiredTime * (1 + (defaultData?.factor - 1) * dynamicData?.level)));
	const [isCancel, setIsCancel] = useState(false);

	const handleCancelBuilding = () => {
		handleCancelBuildingFlag(false);
		const wallet = window.localStorage.getItem('address');
		const newStartTime = 0;
		if (wallet) {
			const handleStartTime = async () => {
				const response = await updateStartTime(wallet, category, additionalData?.item, newStartTime, false);
				if (response) {
					updateData('categories', {
						...data.categories, // Spread the current categories
						[category]: {
							//@ts-ignore
							...data.categories?.[category], // Spread the current category items
							[additionalData?.item]: {
								//@ts-ignore
								...data.categories?.[category][additionalData?.item], // Spread the current values of the specific item
								startTime: newStartTime, // Update the startTime
								progress: false, // Update the progress
							},
						},
					});
				}
			};
			handleStartTime();
		}
		setIsCancel(false);
	}

	useEffect(() => {
		const handleTracking = async () => {
			const endTime: number = dynamicData?.startTime + defaultData?.requiredTime * (1 + (defaultData?.factor - 1) * dynamicData?.level) * 1000;
			const result = await calculateTime(
				dynamicData?.startTime,
				endTime,
				setRemainingTime
			);
			if (result === 0) {
				const wallet = window.localStorage.getItem('address');
				const resourceUpdates = calculateResourceUpdates(currentResources, defaultData?.conditions, defaultData?.factor, dynamicData?.level);
				const itemUpdates = {
					level: dynamicData?.level + 1,
					startTime: 0,
					endTime: endTime,
					progress: false,
				}
				if (wallet) {
					const handleAfterBuilding = async () => {
						const response = await updateAfterBuilding(wallet, resourceUpdates, 'ResearchLab', additionalData.item, itemUpdates);
						if (response) {
							updateData('categories', {
								...data.categories, // Spread the current categories
								ResearchLab: {
									//@ts-ignore
									...data.categories?.[category], // Spread the current category items
									[additionalData.item]: itemUpdates,
								},
							});
							updateData('resources', {
								...data.resources,
								Metal: currentResources?.Metal - calculateResources(defaultData?.conditions?.Metal, defaultData?.factor, dynamicData?.level),
								Substrate: currentResources?.Substrate - calculateResources(defaultData?.conditions?.Substrate, defaultData?.factor, dynamicData?.level),
								Moisture: currentResources?.Moisture - calculateResources(defaultData?.conditions?.Moisture, defaultData?.factor, dynamicData?.level),
								Deuterium: currentResources?.Deuterium - calculateResources(defaultData?.conditions?.Deuterium, defaultData?.factor, dynamicData?.level),
								Energy: {
									...data.resources.Energy,
									consumed: currentResources?.Energy?.consumed + calculateResources(defaultData?.conditions?.Energy, defaultData?.factor, dynamicData?.level)
								}
							});
						}
					};
					handleAfterBuilding();
				}
			}
		}
		handleTracking();
	}, [defaultData?.requiredTime, defaultData?.factor, dynamicData?.level, dynamicData?.startTime, JSON.stringify(data)]);

	return (
		<div
			className={`
			mb-[8px]
			${isProgress || isValid?.[(isValid?.length || 1) - 1] === false ? "text-[grey] cursor-not-allowed" : ""}
			${dynamicData?.progress === true ? 'border-[green] border-[3px]' : ''}
			`}
		>
			<Popover>
				<CardHeader title={additionalData?.title} level={dynamicData?.level} category={category} />
				<div className='bg-black'>
					<CardContent
						category={category}
						img={additionalData?.img}
						level={dynamicData?.level}
						time={remainingTime}
						state={defaultData}
						isValid={isValid}
						item={additionalData?.item}
						isProgress={isProgress}
						isBuilding={dynamicData?.progress}
					/>
				</div>
				{
					dynamicData?.progress ?
						<Popover open={isCancel} onOpenChange={setIsCancel}>
							<PopoverTrigger>
								<div className='text-[#ff0000] text-xs font-normal cursor-pointer'>X</div>
							</PopoverTrigger>
							<PopoverContent className='p-0 bg-[#414141] border-none rounded-[10px] text-white'>
								<div className='bg-[#414141] rounded-[10px] text-center py-1'>
									<p className='text-xs font-normal'>Confirm [{remainingTime}]</p>
								</div>
								<div className='bg-gradient-to-r from-[#848484] to-[#343434] py-1 px-2'>
									<div className='px-1 text-[12px]'>Really Cancel ?</div>
									<div className='flex justify-around text-[10px] mt-3'>
										<div className='text-[#05ff00] cursor-pointer' onClick={handleCancelBuilding}>[Yes]</div>
										<div className='text-[#ff0000] cursor-pointer' onClick={() => setIsCancel(false)}>[Close]</div>
									</div>
								</div>
							</PopoverContent>
						</Popover>
						:
						<span className='text-[#ff0000] text-xs font-normal'>X</span>
				}
			</Popover>
		</div>
	)
}

export const ResearchMainCard = () => {
	const [isValid, setIsValid] = useState<any>([]);
	const [defaultData, setDefaultData] = useState<any>([]);
	const [currentResources, setCurrentResources] = useState<any>([]);
	const [additionalData, setAdditionalData] = useState<any>([]);
	const [isProgress, setIsProgress] = useState<boolean>(false);

	const { data } = useDataContext();

	useEffect(() => {
		const dynamicInfo: any = Object.values(data?.categories?.ResearchLab);
		const hasProgress = dynamicInfo.some((item: any) => item?.progress === true);
		if (hasProgress) {
			setIsProgress(true);
		} else {
			setIsProgress(false);
		}
		const defaultInfo = Object.values(basicData?.categories?.ResearchLab);
		const additionalInfo = [
			{ img: Lab_img_1, title: 'Energy system', item: 'EnergySystem', },
			{ img: Lab_img_2, title: 'Navigation system', item: 'NavigationSystem', },
			{ img: Lab_img_3, title: 'Spaceshipyard', item: 'Spaceshipyard', },
		]
		setCurrentResources(data?.resources);
		setDefaultData(defaultInfo);
		setAdditionalData(additionalInfo);
		setIsValid(validateResources('ResearchLab', basicData, data));

	}, [data])
	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Research laboratory</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29] to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pb-[30px]'>
				{
					defaultData.map((itemData: any, index: number) => (
						<Card category='ResearchLab' isProgress={isProgress} key={index} currentResources={currentResources} additionalData={additionalData?.[index]} isValid={isValid?.[index]} defaultData={itemData} />
					))
				}
			</div>
		</div>
	)
}
