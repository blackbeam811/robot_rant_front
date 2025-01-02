import Contact_icon from '/assets/contact.png'

const rankingData = [
	{ pos: '1', sub: '-', alliance: 'OPS', player: 'ShadowNinja', wallet: 'FhQF...hjU6', total: '68,256,325,236' },
	{ pos: '2', sub: '-', alliance: 'OPS', player: 'FireDrake', wallet: 'AhPA...hjU6', total: '66,256,325,236' },
	{ pos: '3', sub: '+1', alliance: 'OPS', player: 'DarkPhoenix', wallet: 'BhQB...hjU6', total: '65,256,325,236' },
	{ pos: '4', sub: '-', alliance: 'OG', player: 'CyberSamurai', wallet: 'BiQB...lkA3', total: '61,256,325,236' },
	{ pos: '5', sub: '-', alliance: 'e-R-s', player: 'StealthHunter', wallet: 'CjRC...mLb4', total: '60,546,325,236' },
	{ pos: '6', sub: '-2', alliance: 'OG', player: 'IronWarrior', wallet: 'DkSD...nMc5', total: '50,256,325,236' },
	{ pos: '7', sub: '-', alliance: 'e-R-s', player: 'MysticMage', wallet: 'ElTE...oND6', total: '48,256,325,236' },
	{ pos: '8', sub: '+1', alliance: 'e-R-s', player: 'ThunderBolt', wallet: 'FmUF...pOe7', total: '47,256,325,236' },
	{ pos: '9', sub: '-', alliance: '+69+', player: 'SilentAssassin', wallet: 'GnVG...qPf8', total: '46,936,325,236' },
	{ pos: '10', sub: '-', alliance: 'TRC', player: 'VortexViper', wallet: 'HoWH...rQg9', total: '44,568,325,236' },
	{ pos: '11', sub: '-', alliance: '+69+', player: 'GhostSniper', wallet: 'IpXI...sRhA', total: '43,111,325,236' },
	{ pos: '12', sub: '-', alliance: 'TRC', player: 'BlazeStorm', wallet: 'JqYJ...tsIB', total: '23,256,325,236' },
	{ pos: '13', sub: '-1', alliance: 'TRC', player: 'IceBlade', wallet: 'KrZK...uTjC', total: '22,877,325,236' },
	{ pos: '14', sub: '-2', alliance: 'OG', player: 'LunarEclipse', wallet: 'LsLL...uVkD', total: '21,588,325,236' },
	{ pos: '15', sub: '-', alliance: '~ASD~', player: 'SolarFlare', wallet: 'Mt2M...wVIE', total: '21,456,325,236' },
	{ pos: '16', sub: '-', alliance: '<RT>', player: 'StormBringer', wallet: 'Nu3N...xWmF', total: '20,422,325,236' },
	{ pos: '17', sub: '-', alliance: '~ASD~', player: 'VenomFang', wallet: 'Ov4O...yXnG', total: '15,256,325,236' },
	{ pos: '18', sub: '-', alliance: '<RT>', player: 'CrimsonKnight', wallet: 'Pw5P...zYoH', total: '14,856,325,236' },
	{ pos: '19', sub: '-', alliance: '<RT>', player: 'MysticShadow', wallet: 'Qx6Q...A0pI', total: '14,256,325,250' },
	{ pos: '20', sub: '-', alliance: 'TRC2', player: 'FrostDragon', wallet: 'Ry7R...BlqJ', total: '14,256,325,236' },
	{ pos: '21', sub: '-', alliance: '<RT>', player: 'IronFist', wallet: 'Sz8S...C2rK', total: '13,256,325,236' },
	{ pos: '22', sub: '-', alliance: 'TRC2', player: 'WildRanger', wallet: 'Tu9T...D3sL', total: '13,256,325,258' },
	{ pos: '23', sub: '-', alliance: 'BM', player: 'CyberGhost', wallet: 'UvAU...Et4M', total: '12,456,325,236' },
	{ pos: '24', sub: '-', alliance: 'BM', player: 'RapidFire', wallet: 'VwBV...F5uN', total: '12,256,325,256' },
	{ pos: '25', sub: '-', alliance: 'r|b|s', player: 'StarGazer', wallet: 'WxCW...G6vO', total: '11,256,325,555' },
	{ pos: '26', sub: '-2', alliance: 'r|b|s', player: 'DarkTemplar', wallet: 'XyDX...H7wP', total: '10,256,325,236' },
	{ pos: '27', sub: '-', alliance: 'OG', player: 'BlazeKnight', wallet: 'YzEY...I8xQ', total: '10,256,325,236' }
];


export const RankingMainCard = () => {
	return (
		<div>
			<div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Ranking</p>
			</div>
			<div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] h-[calc(100vh-350px)] rounded-b-[10px] overflow-y-scroll'>
				<div className="w-full max-w-6xl overflow-hidden pt-2 pl-5">
					<table className="min-w-full">
						<thead>
							<tr className="text-white text-sm">
								<th className="px-4 py-2 text-left border-l-2">Pos</th>
								<th className="px-4 py-2 text-left border-l-2">Alliance</th>
								<th className="px-4 py-2 text-left border-l-2">Player</th>
								<th className="px-4 py-2 text-left border-l-2">Wallet</th>
								<th className="px-4 py-2 text-left border-l-2">Total</th>
								<th className="px-4 py-2 text-left border-l-2">Contact</th>
							</tr>
						</thead>
						<tbody>
							{rankingData.map((data, index) => (
								<tr key={index} className="text-xs">
									<td className="px-4 py-2 flex flex-row gap-4">
										<div>{data.pos}</div>
										<div className={Number(data.sub) > 0 ? 'text-green-500' : (Number(data.sub) < 0 ? 'text-red-600': '')}>{data.sub}</div>
									</td>
									<td className="px-4 py-2">{data.alliance}</td>
									<td className="px-4 py-2">{data.player}</td>
									<td className="px-4 py-2">{data.wallet}</td>
									<td className="px-4 py-2">{data.total}</td>
									<td className="px-4 py-2 pl-[4%]">
										<img src={Contact_icon} alt='icon' />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
