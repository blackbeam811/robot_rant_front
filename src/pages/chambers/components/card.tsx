import { useEffect, useState } from 'react';
import { useDataContext } from '@/utils/context/DataContext';
import { CardItem } from '@/components/card/cardItem';
import { basicData } from '@/utils/database/data';
import { validateResources } from '@/utils/validate/validates';

import Chamber_img_1 from '/assets/chambers/chamber-1.png'
import Chamber_img_2 from '/assets/chambers/chamber-2.png'
import Chamber_img_3 from '/assets/chambers/chamber-3.png'
import Chamber_img_4 from '/assets/chambers/chamber-4.png'
import Chamber_img_5 from '/assets/chambers/chamber-5.png'
import Chamber_img_6 from '/assets/chambers/chamber-6.png'
import Chamber_img_7 from '/assets/chambers/chamber-7.png'
import Chamber_img_8 from '/assets/chambers/chamber-8.png'
import Chamber_img_9 from '/assets/chambers/chamber-9.png'

export const ChambersMainCard = () => {
	const [isValid, setIsValid] = useState<any>([]);
	const [defaultData, setDefaultData] = useState<any>([]);
	const [currentResources, setCurrentResources] = useState<any>([]);
	const [additionalData, setAdditionalData] = useState<any>([]);
	const [isProgress, setIsProgress] = useState<boolean>(false);

	const { data } = useDataContext();

	useEffect(() => {
		const dynamicInfo: any = Object.values(data?.categories?.Chambers);
		const hasProgress = dynamicInfo.some((item: any) => item?.progress === true);
		if (hasProgress) {
			setIsProgress(true);
		} else {
			setIsProgress(false);
		}
		const defaultInfo = Object.values(basicData?.categories?.Chambers);
		const additionalInfo = [
			{ img: Chamber_img_1, title: 'Tunnel systems', item: 'TunnelSystem', },
			{ img: Chamber_img_2, title: 'Breeding chambers', item: 'BreedingChambers', },
			{ img: Chamber_img_3, title: 'Entrance & exit corridors', item: 'EntranceExitCorridors', },
			{ img: Chamber_img_4, title: 'Energy center', item: 'EnergyCenter', },
			{ img: Chamber_img_5, title: 'Mineral processing plants', item: 'MineralProcessingPlants', },
			{ img: Chamber_img_6, title: 'Deuterium extractor', item: 'DeuteriumExtractor', },
			{ img: Chamber_img_7, title: 'Production factories', item: 'ProductFactories', },
			{ img: Chamber_img_8, title: 'Research laboratories', item: 'ResearchLaboratories', },
			{ img: Chamber_img_9, title: 'Satellite stations', item: 'SatelliteStations', },
		]
		setCurrentResources(data?.resources);
		setDefaultData(defaultInfo);
		setAdditionalData(additionalInfo);
		setIsValid(validateResources('Chambers', basicData, data));

	}, [data])

	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Chambers</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pb-[30px]'>
				<div className='grid grid-cols-3 gap-4'>
					{
						defaultData.map((itemData: any, index: number) => (
							<CardItem category='Chambers' isProgress={isProgress} key={index} currentResources={currentResources} additionalData={additionalData?.[index]} isValid={isValid?.[index]} defaultData={itemData} />
						))
					}
				</div>
			</div>
		</div>
	)
}
