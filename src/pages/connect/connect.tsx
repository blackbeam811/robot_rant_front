import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
  // Import any other wallet adapters you need
} from "@solana/wallet-adapter-wallets";
import { useWallet as walletContext } from "@/utils/WalletContext";
import { fetchPlayer } from '@/utils/function/function';
import { useDataContext } from '@/utils/context/DataContext';

export const Connect = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const { setFullData } = useDataContext();
  const {
    // walletConnected,
    walletAddress,
    setWalletAdapter,
    setWalletAddress,
    setWalletConnected,
    setConnectedWalletIndex,
    connectedWalletIndex,
  } = walletContext();

  useEffect(() => {
    if (window.localStorage.address || walletAddress) {
      navigate('/settings')
    }
  }, [walletAddress])

  const Wallets = [
    {
      id: 0,
      name: "Phantom",
      image: "/assets/phantom.svg",
    },
    {
      id: 1,
      name: "Solflare",
      image: "/assets/solflare.svg",
    },
    {
      id: 2,
      name: "Trust",
      image: "/assets/trust.svg",
    },
  ];



  // Function to connect to the wallet
  const connectWallet = async (walletId: number) => {
    const wallets = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
    ];
    const wallet = wallets[walletId];

    try {
      await wallet.connect();
      if (wallet.publicKey == null) return;
      const walletAdd = wallet.publicKey.toString();
      setWalletAddress(walletAdd);
      window.localStorage.setItem('address', walletAdd);
      setWalletAdapter(wallet);
      setConnectedWalletIndex(walletId);
      setWalletConnected(true);
      handleConnectModal();
      
      if(walletAdd) {
        const data = await fetchPlayer(walletAdd);
        if(data) {
          setFullData(data);
        }
      }
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };

  const handleConnectModal = () => {
    setIsModal(!isModal);
  }

  return (
    <>
      <div className='bg-gradient-to-t from-[#2d1b0a] via-black  to-black p-[20px] h-screen flex flex-col xl:flex-row gap-x-[17px]'>
        <div className='flex gap-x-2 h-14 items-center'>
          <img src='./assets/Logo.svg' alt='' className='w-[50px] h-[50px]' />
          <span className='text-white text-2xl'>ROBOTANT</span>
        </div>
        <div className='w-full xl:w-[80%] mt-20 xl:mt-0'>
          <div className='flex justify-end pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
            <p className='text-white text-[10px] font-normal font-robotoMono'>
              Servertime: Sunday, 2025/05/21 10:55:23
            </p>
          </div>
          <div className='flex flex-col bg-[#282828] rounded-b-[10px] min-h-[200px] justify-between pb-[13px] px-[27px]'>
            <div className='flex flex-col xl:flex-row pt-[10px] justify-end pr-[14px] gap-x-2 overflow-hidden'>
              <div>
                <div className='bg-black inline-block py-[1px] px-[5px] text-[13px] font-normal w-full xl:w-[500px] h-[23px] text-center'>
                  -
                </div>
                <div className='text-center text-[#ff0000] text-[10px] font-normal font-robotoMono mt-[5px]'>
                  Your wallet is not connected!
                </div>
              </div>
              <div className='flex flex-col items-center mt-3 xl:mt-0'>
                <div
                  className='px-[10px] py-[4px] bg-gradient-to-t from-black to-[#666666] hover:cursor-pointer'
                  onClick={handleConnectModal}
                >
                  <img src='./connect.svg' alt='' className='w-[18px] h-[18px]' />
                </div>
                <p className='text-[10px] font-normal font-robotoMono mt-[5px]'>
                  Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isModal ?
          <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center text-white">
            <div
              className="w-full h-full bg-black absolute opacity-20"
              onClick={handleConnectModal}
            ></div>
            <div className="w-[300px] bg-[#10141E] z-10 rounded-2xl flex flex-col px-4 py-6 items-center">
              <div className="w-full flex items-end justify-end">
                <button
                  className="text-[#777777] w-[30px] h-[30px] items-center justify-center flex bg-[#1B1F2D] rounded-full "
                  onClick={handleConnectModal}
                >
                  X
                </button>
              </div>
              <div className="max-w-[300px] my-3">
                <h2 className=" text-xl font-semibold text-center font-robotoMono">
                  Connect a Solana Wallet
                </h2>
              </div>
              <div className="w-full flex flex-col gap-6 mt-7">
                {Wallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={wallet.image}
                        alt={wallet.name}
                        width={20}
                        height={20}
                      />
                      <span className="text-[15px] font-robotoMono">{wallet.name}</span>
                    </div>
                    {connectedWalletIndex === wallet.id ? (
                      <span className="text-green-500 font-robotoMono">Connecting...</span>
                    ) : (
                      <button
                        className="bg-gradient-to-t from-black to-[#666666] hover:cursor-pointer text-white px-4 py-1 rounded text-[15px] font-robotoMono"
                        onClick={() => {
                          connectWallet(wallet.id);
                        }}
                      >
                        Connect
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div> : null
      }
    </>
  )
}
