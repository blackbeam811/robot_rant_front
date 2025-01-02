import { Link, useLocation } from 'react-router-dom'
import LockedContent from './locked-content';
import { useDataContext } from '@/utils/context/DataContext';

export const SidebarItem = ({
	title,
	urls,
}: {
	title: string
	urls: { label: string; to: string }[]
}) => {
	const { pathname } = useLocation()
	const { data } = useDataContext();

	return (
		<div className='w-full xl:w-[231px] min-h-[134px]'>
			<div className='min-h-[25px] bg-[#3e3e3e] rounded-tl-[10px] rounded-tr-[10px] text-center py-1'>
				{title}
			</div>
			<div className='bg-[#292929] rounded-b-[10px] text-center min-h-[109px] flex flex-col py-1 items-center justify-center'>
				{
					data.userInfo.wallet ?
						(urls.map((url) => {
							return (
								<Link
									to={url.to}
									key={url.to}
									className={`text-[15px] mb-1 ${pathname === url.to ? 'text-white' : 'text-[#888888]'
										}`}
								>
									{url.label}
								</Link>
							)
						})) :

						<LockedContent>
							{urls.map((url) => {
								return (
									<div
										key={url.to}
										className={`text-[15px] mb-1 ${pathname === url.to ? 'text-white' : 'text-[#888888]'
											}`}
									>
										{url.label}
									</div>
								)
							})}
						</LockedContent>
				}
			</div>
		</div>
	)
}
