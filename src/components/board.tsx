import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useWallet as walletContext } from "@/utils/WalletContext";
import { useDataContext } from "@/utils/context/DataContext";
import { resourceGenerate } from "@/utils/function/function";

const DashboardItem = ({
	title,
	amount,
	icon,
}: {
	title: string
	amount: any
	icon: string
}) => {
	return (
		<div className='flex flex-col gap-y-[5px]'>
			<div className='flex gap-x-[5px] items-center'>
				<img src={`./${icon}.svg`} alt='' className='w-5 h-5' />
				<p className='text-sm font-normal'>{title}</p>
			</div>
			<div className='w-[180px]  bg-black/50 text-center py-[3px] text-sm font-normal'>
				{amount}
			</div>
		</div>
	)
}

export const Board = () => {
	const [address, setAddress] = useState<any>();
	const [resources, setResources] = useState<any>({});
	const navigate = useNavigate()
	const { data, updateData } = useDataContext();

	useEffect(() => {
		resourceGenerate(data, updateData);
		setResources(data?.resources);
		setAddress(window?.localStorage?.address);
	}, [window.localStorage.getItem('address'), data, updateData])
	const {
		walletConnected,
		walletAdapter,
		setWalletConnected,
		setConnectedWalletIndex,
		setWalletAddress,
	} = walletContext();

	const handleDisconnect = () => {
		window.localStorage.removeItem("address");
		if (walletConnected && walletAdapter) {
			walletAdapter.disconnect();
			setWalletConnected(false);
			setConnectedWalletIndex(null);
			setWalletAddress("");
		}
		updateData('userInfo', {
			wallet: '',
			userName: '',
		});
		updateData('resources', {
			Metal: 0,
			Substrate: 0,
			Moisture: 0,
			Deuterium: 0,
			Energy: {
				consumed: 0,
				total: 0,
			}
		});
		navigate('/connect')
	}
	return (
		<div>
			<div className='flex flex-col xl:flex-row justify-between pl-[20px] xl:pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px] mt-10 xl:mt-0'>
				<p className='text-sm font-normal'>Board</p>
				<p className='text-white text-[10px] font-normal font-robotoMono'>
					Servertime: Sunday, 2025/05/21 10:55:23
				</p>
			</div>
			<div className='flex flex-col bg-[#282828] rounded-b-[10px] min-h-[200px] justify-between pb-[13px] px-[27px]'>
				<div className='flex flex-col xl:flex-row justify-start pt-[10px] xl:justify-end pr-[14px] '>
					<div>
						<div className='bg-black inline-block py-[1px] px-[5px] text-[13px] font-normal w-full'>
							{address}
						</div>
						<div className='text-center text-[#05ff00] text-[10px] font-normal font-robotoMono mt-[5px]'>
							Your wallet is connected!
						</div>
					</div>
					<div className='flex flex-col items-start xl:items-center'>
						<div
							className='px-[10px] py-[4px] bg-gradient-to-t from-black to-[#666666] hover:cursor-pointer'
							onClick={handleDisconnect}
						>
							<img
								src='./disconnect.svg'
								alt=''
								className='w-[18px] h-[18px]'
							/>
						</div>
						<p className='text-[10px] font-normal font-robotoMono mt-[5px]'>
							Disconnect
						</p>
					</div>
				</div>
				<div className='flex flex-col xl:flex-row justify-between mt-5 xl:mt-0 gap-y-5 xl:gap-y-0'>
					<DashboardItem title='Metal' amount={resources?.Metal?.toLocaleString()} icon='metal-plate' />
					<DashboardItem title='Substrate' amount={resources?.Substrate?.toLocaleString()} icon='substrate' />
					<DashboardItem title='Moisture' amount={resources?.Moisture?.toLocaleString()} icon='moisture' />
					<DashboardItem title='Deuterium' amount={resources?.Deuterium?.toLocaleString()} icon='deuterium' />
					<DashboardItem
						title='energy'
						amount={
							<div className='flex items-center justify-center'>
								<p className='text-[#05ff00]'>{resources?.Energy?.consumed.toLocaleString()}</p>
								<p>/{resources?.Energy?.total.toLocaleString()}</p>
							</div>
						}
						icon='energy'
					/>
				</div>
			</div>
		</div>
	)
}
