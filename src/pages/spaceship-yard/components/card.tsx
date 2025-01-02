import { useEffect, useState } from 'react';
import { useDataContext } from '@/utils/context/DataContext';
import { CardItem } from '@/components/card/cardItem';
import { basicData } from '@/utils/database/data';
import { validateResources } from '@/utils/validate/validates';

import Yard_img_1 from '/assets/yards/yard-1.png';
import Yard_img_2 from '/assets/yards/yard-2.png';
import Yard_img_3 from '/assets/yards/yard-3.png';
import Yard_img_4 from '/assets/yards/yard-4.png';
import Yard_img_5 from '/assets/yards/yard-5.png';
import Yard_img_6 from '/assets/yards/yard-6.png';

export const MainSpaceshipYardCard = () => {
	const [isValid, setIsValid] = useState<any>([]);
	const [defaultData, setDefaultData] = useState<any>([]);
	const [currentResources, setCurrentResources] = useState<any>([]);
	const [additionalData, setAdditionalData] = useState<any>([]);
	const [isProgress, setIsProgress] = useState<boolean>(false);

	const { data } = useDataContext();

	useEffect(() => {
		const dynamicInfo: any = Object.values(data?.categories?.SpaceshipYard);
		const hasProgress = dynamicInfo.some((item: any) => item?.progress === true);
		if (hasProgress) {
			setIsProgress(true);
		} else {
			setIsProgress(false);
		}
		const defaultInfo = Object.values(basicData?.categories?.SpaceshipYard);
		const additionalInfo = [
			{ img: Yard_img_1, title: 'Colonization ships', item: 'ColonizationShip', },
			{ img: Yard_img_2, title: 'Scout satellites', item: 'ScoutSatellites', },
			{ img: Yard_img_3, title: 'Exploration drones', item: 'ExplorationDrones', },
			{ img: Yard_img_4, title: 'Battleships', item: 'Battleship', },
			{ img: Yard_img_5, title: 'Defense ships', item: 'DefenseShips', },
			{ img: Yard_img_6, title: 'Processing ships', item: 'ProcessingShips', },
		]
		setCurrentResources(data?.resources);
		setDefaultData(defaultInfo);
		setAdditionalData(additionalInfo);
		setIsValid(validateResources('SpaceshipYard', basicData, data));

	}, [data])

	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Spaceship yard</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pb-[30px]'>
				<div className='grid grid-cols-3 gap-4'>
					{
						defaultData.map((itemData: any, index: number) => (
							<CardItem category='SpaceshipYard' isProgress={isProgress} key={index} currentResources={currentResources} additionalData={additionalData?.[index]} isValid={isValid?.[index]} defaultData={itemData} />
						))
					}
				</div>
			</div>
		</div>
	)
}
