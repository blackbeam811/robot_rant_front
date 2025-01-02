import { useEffect, useState } from "react";
import { fetchBalance } from "@/utils/function/function";
import { useDataContext } from "@/utils/context/DataContext";
import { useNavigate } from "react-router-dom";
import { TimeTracker } from "@/components/timer";

export const HomeMainCard = () => {
	const navigate = useNavigate();
	const { data } = useDataContext();
	const [speed, setSpeed] = useState(11);
	const [balance, setBalance] = useState<number | null>(null);

	const buildings = [
		{ category: 'Chambers', label: 'Chambers' },
		{ category: 'ResearchLab', label: 'Research laboratory' },
		{ category: 'SpaceshipYard', label: 'Spaceship yard' },
		{ category: 'FleetCommand', label: 'Fleet command' },
		{ category: 'Farming', label: 'Farming' },
	]

	const handleSpeedChange = (e: any) => {
		setSpeed(e.target.value);
	};

	useEffect(() => {
		if (!data.userInfo.wallet) {
			navigate('/settings')
		}
		const getBalance = async () => {
			const amount = await fetchBalance(); // Wait for the async function to resolve
			setBalance(amount); // Update the state with the resolved value
		};
		getBalance();
	}, [data])

	return (
		<div className='mt-[19px]'>
			<div className='bg-[#414141] py-2 pl-[70px] text-sm font-normal rounded-t-[10px]'>
				Home
			</div>
			<div className='bg-[#282828] rounded-b-[10px] min-h-[300px] py-[10px] px-[26px] flex flex-col xl:flex-row gap-x-[24px]'>
				<img
					src='./UniversalUpscaler.png'
					alt=''
					className='w-full xl:w-[300px] h-[300px] object-cover'
				/>

				<div className='w-full'>
					<div className='flex justify-between flex-col xl:flex-row mt-5 xl:mt-0'>
						<Item title='Size' subTitle='35/245 Chambers' />
						<Item title='Temperature' subTitle='11°C' />
						<Item title='Location' subTitle='345:406' />
					</div>
					<div className="mt-5 xl:mt-mt-[16px]">Building</div>
					{
						buildings.map((item, index) => (
							<div className='flex flex-col xl:flex-row' key={index}>
								<div className='w-[46%]'>
									<Item
										title=''
										subTitles={[item.label]}
									/>
								</div>
								<div className='w-[50%] flex flex-col'>
									<TimeTracker category={item.category} />
								</div>
							</div>
						))
					}
					<div className='flex mt-[11px] flex-col'>
						<div className='flex gap-x-28 flex-col xl:flex-row'>
							<p className='text-sm font-normal'>Staking</p>
							<div className='w-[411px] h-[25px] relative'>
								<div className='w-[411px] h-[25px] left-0 top-0 absolute bg-gradient-to-r from-[#414141] to-black' />
								<div className='text-right text-sm font-normal absolute right-[20px] top-1/2 -translate-y-1/2'>
									{balance?.toLocaleString()} <span className='ml-4'>$RANT</span>
								</div>
							</div>
						</div>
						<div>
							<p className='text-[15px] font-normal font-robotoMono'>
								Duration
							</p>
							<input
								type="range"
								min="0"
								max="36"
								value={speed}
								onChange={handleSpeedChange}
								className="w-64 h-0.5 bg-gradient-to-r from-[#D97012] to-[#80F9E7] appearance-none"
							/>
							<div className="flex flex-row text-[12px] text-[#FFFFFF80] font-normal justify-between w-64">
								<div>0</div>
								<div>3</div>
								<div>12</div>
								<div>36</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const Item = ({
	title,
	subTitle,
	subTitles,
}: {
	title: string
	subTitle?: string
	subTitles?: string[]
}) => {
	return (
		<div className=''>
			<div className='text-sm font-normal'>{title}</div>
			{subTitles?.length ? (
				subTitles.map((el, idx) => (
					<p className='text-[15px] font-normal font-robotoMono' key={idx}>
						{el}
					</p>
				))
			) : (
				<p className='text-[15px] font-normal font-robotoMono'>{subTitle}</p>
			)}
		</div>
	)
}
