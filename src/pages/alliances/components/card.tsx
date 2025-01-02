import { Input } from '@/components/input'

export const AlliancesMainCard = () => {
  const a = false
  return (
    <div>
      <div className='pl-[70px] bg-[#414141] py-2 pr-[26px] rounded-t-[10px]'>
        <p className='text-sm font-normal'>Alliances</p>
      </div>
      <div className='bg-gradient-to-b from-[#1f1f1f] via-[#2a2a29]  to-[#3b3128] min-h-[calc(100vh-350px)] rounded-b-[10px] pb-[30px]'>
        <p className='text-xs font-normal px-[7px] py-2'>Alliance dashboard</p>
        <div className='bg-black px-[7px] py-2'>
          <p className='flex text-sm font-normal mt-[5px]'>
            Founding a new alliance/{'  '}
            <span className='text-[#858585] ml-[5px]'> Members </span> /
            <span className='text-[#858585] ml-[5px]'> Search alliance</span>
          </p>
          <div className='flex gap-x-[40px] w-full mt-[8px]'>
            <div className='flex gap-x-[15px] items-center'>
              <label htmlFor='tag' className='text-xs'>
                TAG
              </label>
              <Input id='tag' type='text' className='w-[78px]' />
            </div>
            <div className='flex gap-x-[15px] items-center w-full'>
              <label htmlFor='name' className='text-xs'>
                Name
              </label>
              <Input id='name' type='text' className='w-full' />
            </div>
          </div>
          {!a ? (
            <div className='flex flex-col mt-[6px]'>
              <label htmlFor='description' className='text-xs font-normal'>
                Alliance description (html)
              </label>
              <textarea
                name='description'
                id='description'
                className='text-xs bg-[#868686] px-2 py-1 outline-none text-[#37f7d7] mt-1 min-h-[350px]'
              />
              <div className='flex mt-[6px] gap-x-[20px]'>
                <button className='cursor-pointer text-[#05ff00] text-xs'>
                  [found]
                </button>
                <button className='cursor-pointer text-[#da7211] text-xs'>
                  [preview]
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
