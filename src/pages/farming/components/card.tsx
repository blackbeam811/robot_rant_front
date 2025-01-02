import { useEffect, useState } from 'react';
import { useDataContext } from '@/utils/context/DataContext';
import { CardItem } from '@/components/card/cardItem';
import { basicData } from '@/utils/database/data';
import { validateResources } from '@/utils/validate/validates';

import Farm_img_1 from '/assets/farms/farm-1.png';
import Farm_img_2 from '/assets/farms/farm-2.png';
import Farm_img_3 from '/assets/farms/farm-3.png';
import Farm_img_4 from '/assets/farms/farm-4.png';

export const MainFarmingCard = () => {
	const [isValid, setIsValid] = useState<any>([]);
	const [defaultData, setDefaultData] = useState<any>([]);
	const [currentResources, setCurrentResources] = useState<any>([]);
	const [additionalData, setAdditionalData] = useState<any>([]);
	const [isProgress, setIsProgress] = useState<boolean>(false);

	const { data } = useDataContext();

	useEffect(() => {
		const dynamicInfo: any = Object.values(data?.categories?.Farming);
		const hasProgress = dynamicInfo.some((item: any) => item?.progress === true);
		if (hasProgress) {
			setIsProgress(true);
		} else {
			setIsProgress(false);
		}
		const defaultInfo = Object.values(basicData?.categories?.Farming);
		const additionalInfo = [
			{ img: Farm_img_1, title: 'Iron mine', item: 'IronMine', },
			{ img: Farm_img_2, title: 'Substrate', item: 'Substrate', },
			{ img: Farm_img_3, title: 'Moisture', item: 'Moisture', },
			{ img: Farm_img_4, title: 'Water pipelines', item: 'WaterPipelines', },
		]
		setCurrentResources(data?.resources);
		setDefaultData(defaultInfo);
		setAdditionalData(additionalInfo);
		setIsValid(validateResources('Farming', basicData, data));

	}, [data])

	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Farming</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pb-[30px]'>
				<div className='grid grid-cols-3 gap-4'>
					{
						defaultData.map((itemData: any, index: number) => (
							<CardItem category='Farming' isProgress={isProgress} key={index} currentResources={currentResources} additionalData={additionalData?.[index]} isValid={isValid?.[index]} defaultData={itemData} />
						))
					}
				</div>
			</div>
		</div>
	)
}
