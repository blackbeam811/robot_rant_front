import { useState, useEffect } from "react";

const messageData: any = [
	{ from: 'ShadowNinja', title: 'I found a new planet', msg: 'Astronomers have discovered a new exoplanet, Kepler-452f, located about 1,400 light-years away in the habitable zone of a star similar to our Sun. The planet, roughly Earth-sized, orbits its star in a stable orbit, potentially offering conditions suitable for liquid water and life. "This discovery is a major step in our search for extraterrestrial life," said Dr. Maria Lopez, an astrobiologist on the team. While there is no direct evidence of life yet, Kepler-452f opens up exciting possibilities for future exploration.', checked: false },
	{ from: 'FireDrake', title: 'How are you?', msg: 'Astronomers have discovered a new exoplanet, Kepler-452f, located about 1,400 light-years away in the habitable zone of a star similar to our Sun. The planet, roughly Earth-sized, orbits its star in a stable orbit, potentially offering conditions suitable for liquid water and life. "This discovery is a major step in our search for extraterrestrial life," said Dr. Maria Lopez, an astrobiologist on the team. While there is no direct evidence of life yet, Kepler-452f opens up exciting possibilities for future exploration.', checked: true },
	{ from: 'DarkPhoenix', title: 'Ready for a new Alliance?', msg: 'Astronomers have discovered a new exoplanet, Kepler-452f, located about 1,400 light-years away in the habitable zone of a star similar to our Sun. The planet, roughly Earth-sized, orbits its star in a stable orbit, potentially offering conditions suitable for liquid water and life. "This discovery is a major step in our search for extraterrestrial life," said Dr. Maria Lopez, an astrobiologist on the team. While there is no direct evidence of life yet, Kepler-452f opens up exciting possibilities for future exploration.', checked: false },
	{ from: 'CyberSamurai', title: 'Help!!!!', msg: 'Astronomers have discovered a new exoplanet, Kepler-452f, located about 1,400 light-years away in the habitable zone of a star similar to our Sun. The planet, roughly Earth-sized, orbits its star in a stable orbit, potentially offering conditions suitable for liquid water and life. "This discovery is a major step in our search for extraterrestrial life," said Dr. Maria Lopez, an astrobiologist on the team. While there is no direct evidence of life yet, Kepler-452f opens up exciting possibilities for future exploration.', checked: true },
	{ from: 'StealthHunter', title: 'Send me some Metal please', msg: 'Astronomers have discovered a new exoplanet, Kepler-452f, located about 1,400 light-years away in the habitable zone of a star similar to our Sun. The planet, roughly Earth-sized, orbits its star in a stable orbit, potentially offering conditions suitable for liquid water and life. "This discovery is a major step in our search for extraterrestrial life," said Dr. Maria Lopez, an astrobiologist on the team. While there is no direct evidence of life yet, Kepler-452f opens up exciting possibilities for future exploration.', checked: true },
];

export const MessagesMainCard = () => {
	const [newMsgs, setNewMsgs] = useState(0);
	const [isMsg, setIsMsg] = useState(false);
	const [msgIndex, setMsgIndex] = useState(0);
	const [data, setData] = useState<any>(messageData);

	const handleMsg = (index: any) => {
		setIsMsg(true);
		setMsgIndex(index);
		updateCheckedStatus(index);
	}

	const updateMessages = (index: any) => {
		const updatedMessages = data.filter((_: any, num: any) => num !== index);
		setData(updatedMessages);
		setIsMsg(false);
	}

	const updateCheckedStatus = (index: any) => {
		if (index >= 0 && index < data.length) {
			data[index].checked = true;
			setData(data)
		} else {
			console.error('Index out of bounds');
		}
	};

	useEffect(() => {
		const uncheckedCount = data.filter((item: { checked: any; }) => !item.checked).length;
		setNewMsgs(uncheckedCount);
	}, [updateCheckedStatus])

	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px] flex flex-row gap-1 items-center cursor-pointer' onClick={() => { setIsMsg(false) }}>
				{data.length !== 0 ?
					<>
						<p className='text-sm font-normal'>New Messages</p>
						{
							newMsgs !== 0 &&
							<div className="text-[10px] bg-red-600 rounded-full pl-1 w-5 h-5 pt-1">{newMsgs.toString()}</div>
						}
					</> :
					<p className='text-sm font-normal'>No Messages</p>
				}
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pt-2 pl-16'>
				{data.length !== 0 &&
					<table className="min-w-full">
						<thead>
							<tr className="text-white text-sm">
								<th className="px-4 py-2 text-left border-l-2">From</th>
								<th className="px-4 py-2 text-left border-l-2">Title</th>
								<th className="px-4 py-2 text-left border-l-2"></th>
							</tr>
						</thead>
						<tbody>
							{
								!isMsg ?
									data.map((msg: any, index: any) => (
										<tr key={index} className="text-xs">
											<td className={`px-4 py-2 cursor-pointer ${msg.checked ? 'text-[#5E5E5E]' : 'text-white'}`} onClick={() => handleMsg(index)}>{msg.from}</td>
											<td className={`px-4 py-2 cursor-pointer ${msg.checked ? 'text-[#5E5E5E]' : 'text-white'}`} onClick={() => handleMsg(index)}>{msg.title}</td>
											<td className="px-4 py-2 text-red-700 cursor-pointer" onClick={() => updateMessages(index)}>[delete]</td>
										</tr>
									)) :
									<>
										<tr className="text-xs">
											<td className={`px-4 py-2 cursor-pointer text-white`}>{data[msgIndex].from}</td>
											<td className={`px-4 py-2 cursor-pointer text-white`}>{data[msgIndex].title}</td>
										</tr>
									</>

							}
						</tbody>
					</table>}
				{
					isMsg && (
						<div>
							<div className="bg-[#87878780] w-[80%] min-h-[calc(100vh-550px)] pt-6 pl-2 pr-[170px] text-[12px] font-medium">{data[msgIndex].msg}</div>
							<div className="flex flex-row gap-6 pl-8 text-sm">
								<div className="cursor-pointer">[Reply]</div>
								<div className="text-[red] cursor-pointer" onClick={() => updateMessages(msgIndex)}>[Delete]</div>
								<div className="text-[yellow] cursor-pointer" onClick={() => { setIsMsg(false) }}>[Cancel]</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}
