import Contact_icon from '/assets/contact.png'
export const ContactsMainCard = () => {
	const contactsData = [
		{ alliance: 'OPS', player: 'ShadowNinja', wallet: 'FhQF...hjU6' },
		{ alliance: 'OPS', player: 'FireDrake', wallet: 'AhPA...hjU6' },
		{ alliance: 'OPS', player: 'DarkPhoenix', wallet: 'BhQB...hjU6' },
		{ alliance: 'OG', player: 'CyberSamurai', wallet: 'BiQB...lKa3' },
		{ alliance: 'e-R-s', player: 'StealthHunter', wallet: 'CjRC...mLb4' },
	]
	return (
		<div>
			<div className='pl-[100px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Contacts</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px]'>
				<div className="w-full max-w-6xl overflow-hidden pt-2 pl-16">
					<table className="min-w-full">
						<thead>
							<tr className="text-white text-sm">
								<th className="px-4 py-2 text-left border-l-2">Alliance</th>
								<th className="px-4 py-2 text-left border-l-2">Player</th>
								<th className="px-4 py-2 text-left border-l-2">Wallet</th>
								<th className="px-4 py-2 text-left border-l-2">Contact</th>
								<th className="px-4 py-2 text-left"></th>
							</tr>
						</thead>
						<tbody>
							{contactsData.map((contact, index) => (
								<tr key={index} className="text-xs">
									<td className="px-4 py-2">{contact.alliance}</td>
									<td className="px-4 py-2">{contact.player}</td>
									<td className="px-4 py-2">{contact.wallet}</td>
									<td className="px-4 py-2 pl-[4%]">
										<img src={Contact_icon} alt='icon' />
									</td>
									<td className="px-4 py-2 text-red-700 cursor-pointer">[delete contact]</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
