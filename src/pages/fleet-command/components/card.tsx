import { useState, useEffect } from 'react'
import './custom.css'

import Attack_icon from '/assets/attack.png'
import Shield_icon from '/assets/shield.png'
import Tube_icon from '/assets/tube.png'

const cardData = {
	table: [
		{ ships: 'Colonization Ships', number: '3', },
		{ ships: 'Scout satellites', number: '25', },
		{ ships: 'Exploration drones', number: '4', },
		{ ships: 'Battleships', number: '8', },
		{ ships: 'Defenseships', number: '1', },
		{ ships: 'Processing ships', number: '3', },
	],
	'Target coordinates': '278:265',
	'Flight time': '00:12:34',
	'Consumption': '250',
}

export const MainFleetCommandCard = () => {
	const [coordinates, setCoordinates] = useState<
		{ top: string; left: string }[]
	>([])

	const generateRandomCoordinate = (radius: number) => {
		const angle = Math.random() * 2 * Math.PI
		const r = Math.sqrt(Math.random()) * radius
		const x = r * Math.cos(angle)
		const y = r * Math.sin(angle)
		return {
			top: `${50 + y}%`,
			left: `${50 + x}%`,
		}
	}

	useEffect(() => {
		const randomCoords = []
		const fixedCoord = generateRandomCoordinate(40)
		randomCoords.push(fixedCoord)

		for (let i = 0; i < 50; i++) {
			randomCoords.push(generateRandomCoordinate(40))
		}

		setCoordinates(randomCoords)
	}, [])

	const handleShuffle = () => {
		const shuffledCoordinates = coordinates.slice(1)
		setCoordinates([generateRandomCoordinate(40), ...shuffledCoordinates])
	}
	const [speed, setSpeed] = useState(68);
	const [selectedOption, setSelectedOption] = useState('Attack');

	const handleSpeedChange = (e: any) => {
		setSpeed(e.target.value);
	};


	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Fleet command</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29] to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pb-[20px] flex'>
				<div className='w-full text-white bg-[#181818] mr-3'>
					<div className='text-sm pl-2 py-1'>Available units</div>
					<div className='text-sm font-normal bg-black min-h-[calc(100vh-430px)] pl-2 pr-5 py-2 relative'>
						<table className="min-w-full border-separate">
							<thead>
								<tr className="text-white text-sm">
									<th className="py-2 text-left">Ships</th>
									<th className="px-4 py-2 text-left">Number</th>
									<th className="px-4 py-2">
										<img src={Attack_icon} alt='attack' />
									</th>
									<th className="px-4 py-2">
										<img src={Shield_icon} alt='shield' />
									</th>
								</tr>
							</thead>
							<tbody>
								{cardData.table.map((data, index) => (
									<tr key={index} className="text-xs">
										<td className="py-1">{data.ships}</td>
										<td className="px-4 py-1 pl-[10%]">{data.number}</td>
										<td className="px-4 py-1 bg-[#434343]">O</td>
										<td className="px-4 py-1 bg-[#434343]">O</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='mt-[40px] w-[50%] text-xs'>
							<div className='flex flex-row justify-between'>
								<div>Target coordinates: </div>
								<div className='bg-[#434343] px-1 py-1'>278:265</div>
							</div>
							<div className='flex flex-row justify-between'>
								<div>Flight time: </div>
								<div className='px-1 py-1'>00:12:34</div>
							</div>
							<div className='flex flex-row justify-between'>
								<div>Consumption: </div>
								<div className='px-1 py-1 flex flex-row gap-2'>
									<img src={Tube_icon} alt='tube' />
									<div> 250</div>
								</div>
							</div>
							<div className="flex flex-col justify-center text-white text-xs">
								<div className="flex space-x-8 mb-4">
									<div className="flex items-center">
										<input
											type="radio"
											id="attack"
											name="option"
											value="Attack"
											checked={selectedOption === 'Attack'}
											onChange={() => setSelectedOption('Attack')}
											className="mr-2"
										/>
										<label htmlFor="attack">
											Attack
										</label>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											id="observation"
											name="option"
											value="Observation"
											checked={selectedOption === 'Observation'}
											onChange={() => setSelectedOption('Observation')}
											className="mr-2"
										/>
										<label htmlFor="observation">
											Observation
										</label>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											id="settle"
											name="option"
											value="Settle"
											checked={selectedOption === 'Settle'}
											onChange={() => setSelectedOption('Settle')}
											className="mr-2"
										/>
										<label htmlFor="settle">
											Settle
										</label>
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<span>Speed:</span>
									<input
										type="range"
										min="0"
										max="100"
										value={speed}
										onChange={handleSpeedChange}
										className="w-64 h-0.5 bg-gradient-to-r from-[#D97012] to-[#80F9E7] appearance-none"
									/>
								</div>
								<div className='text-right w-full text-gray-500'>{speed}%</div>
							</div>
						</div>
						<div className='absolute bottom-6 right-5 flex flex-row gap-2'>
							<div className='text-[#838383]'>00:00:00</div>
							<div className='text-[#DA7211] cursor-pointer'>[bring back]</div>
							<div className='text-[#838383]'>00:12:34</div>
							<div className='text-[#05FF00] cursor-pointer'>[send]</div>
						</div>
					</div>
				</div>
				<div className='w-full bg-[#7d7d7d] relative'>
					<div className='absolute left-[60%] top-[70%]'>
						<div className='w-[100px] h-[100px] rounded-full bg-black relative'>
							{coordinates.map((coord, index) => (
								<span
									key={index}
									className={`rounded-full absolute ${index === 0 ? 'bg-red-500 coodinate-line h-[3px] w-[3px]' : 'bg-white w-[2px] h-[2px]'
										}`}
									style={{
										top: coord.top,
										left: coord.left,
										transform: index === 0 ? 'scale(1.5)' : 'none',
									}}
								></span>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='mt-4 flex justify-between'>
				<button
					onClick={handleShuffle}
					className='px-4 py-2 bg-blue-500 text-white rounded'
				>
					Shuffle Coordinates
				</button>
			</div>
		</div>
	)
}
