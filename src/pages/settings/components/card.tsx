import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import { Input } from '@/components/input'
import { fetchBalance } from '@/utils/function/function';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { SERVER_URL } from '@/constants/server-url';
import { useDataContext } from '@/utils/context/DataContext';

export const SettingsMainCard = () => {
	const navigate = useNavigate();
	const { data, updateData } = useDataContext();

	const [balance, setBalance] = useState<number>(0);
	const [userName, setUserName] = useState<string>('');
	const [isOpenUserName, setIsOpenUserName] = useState<boolean>(false);
	const [isOpenBalance, setIsOpenBalance] = useState<boolean>(false);

	useEffect(() => {
		const getBalance = async () => {
			const amount = await fetchBalance(); // Wait for the async function to resolve
			setBalance(amount); // Update the state with the resolved value
		};
		getBalance();
	}, [])

	const handleUserName = (e: any) => {
		setUserName(e.target.value);
	}

	const handleStart = async (e: any) => {
		e.preventDefault();

		if (!userName || userName.trim().length === 0) {
			setIsOpenUserName(true)
			return
		} else {
			if (balance < 1000000) {
				setIsOpenBalance(true);
				return
			} else {
				try {
					const wallet = window.localStorage.address;
					const API_URL = `${SERVER_URL}/api/players`;
					const result = await axios.post(
						`${API_URL}`,
						{ wallet, userName },
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);
					if (result) {
						updateData('userInfo', {
							wallet: wallet,
							userName: userName,
						});
						updateData('resources', {
							Metal: 5000,
							Substrate: 5000,
							Moisture: 5000,
							Deuterium: 5000,
							Energy: {
								consumed: 0,
								total: 20,
							}
						});
						navigate('/');
					}
				} catch (error: any) {
					console.error(`Error: ${error.response.data.message}`);
					alert(error.response.data.message)
				}
			}
		}
	}


	return (
		<div>
			<div className='pl-[70px] bg-[#2e2e2e] py-2 pr-[26px] rounded-t-[10px]'>
				<p className='text-sm font-normal'>Settings</p>
			</div>
			<div className='bg-gradient-to-b from-[#414141] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] p-[64px] pb-3 flex flex-col justify-between items-start'>
				<div>
					<div className='flex gap-x-8'>
						<label htmlFor='username'>Username</label>
						<div className='w-full'>
							<Popover open={isOpenUserName}>
								<PopoverTrigger>
									{
										!data.userInfo.wallet ?
											<Input id='username' type='string' auto='off' onFocus={() => setIsOpenUserName(false)} className='w-full' value={userName} onChange={(e: any) => { handleUserName(e) }} /> :
											<div className='cursor-default text-[#37f7d7]'>{data.userInfo.userName && data.userInfo.userName}</div>
									}
								</PopoverTrigger>
								<PopoverContent className='p-0 bg-[#414141] border-none rounded-[10px] text-white'>
									<div className='bg-gradient-to-r from-[#222121] to-[#757474] rounded-[5px] text-center py-1'>
										<p className='text-xs font-normal text-[red]'>!</p>
									</div>
									<div className='bg-gradient-to-r from-[#8a8989] to-[#363636] py-1 px-2'>
										<div className='px-1 text-[10px]'>
											<span className='text-[#ff0000]'>Note: </span>
											This username cannot be changed later, so think carefully about
											how you want to be known in the RobotAnt world.
										</div>
									</div>
								</PopoverContent>
							</Popover>
							{
								!data.userInfo.wallet ?
									<p className='text-[8px] font-normal mt-1'>
										<span className='text-[#ff0000]'>Note: </span>
										This username cannot be changed later, so think carefully about
										how you want to be known in the RobotAnt world.
									</p> : null
							}
						</div>
					</div>
					<div className='w-[511px] h-[25px] relative mt-[36px] mb-[27px]'>
						<div className='w-[511px] h-[25px] left-0 top-0 absolute bg-gradient-to-r from-[#414141] to-black' />
						<div className='text-left absolute left-1'>Rant balance</div>
						<div className='text-right text-sm font-normal absolute right-[20px] top-1/2 -translate-y-1/2'>
							<Popover open={isOpenBalance}>
								<PopoverTrigger>
									{balance?.toLocaleString()} <span className='ml-4'>$RANT</span>
								</PopoverTrigger>
								<PopoverContent className='p-0 bg-[#414141] border-none rounded-[10px] text-white'>
									<div className='bg-gradient-to-r from-[#222121] to-[#757474] rounded-[5px] text-center py-1'>
										<p className='text-xs font-normal text-[red]'>!</p>
									</div>
									<div className='bg-gradient-to-r from-[#8a8989] to-[#363636] py-1 px-2'>
										<div className='px-1 text-[10px]'>
											<span className='text-[#ff0000]'>Note: </span>
											In RobotAnt, players must hold a minimum of 1 million $RANT tokens to
											participate in the game.
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>

					</div>
					<p className='text-[#da7211] text-xs font-normal mb-1'>Notice</p>
					<p className='text-xs font-normal'>
						In *RobotAnt*, your starting planet is automatically assigned based
						on the amount of RANT tokens you hold. While the resource
						distribution of the planets varies depending on the token amount,
						the strategic advantages remain the same for all players. This
						system ensures that every player has an equal opportunity to develop
						their strategy and efficiency within the game.
					</p>
					<p className='text-xs font-normal uppercase mt-5'>
						In RobotAnt, players must hold a minimum of 1 million RANT tokens to
						participate in the game.
					</p>
				</div>
				<div className='flex justify-end w-full items-end'>
					{
						!data.userInfo.wallet ?
							<button className='text-[#05ff00] text-sm font-normal' onClick={handleStart}>
								[Set username and play RANT]
							</button> : null
					}
				</div>
			</div>
		</div>
	)
}
