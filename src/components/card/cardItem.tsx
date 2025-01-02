import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { useDataContext } from "@/utils/context/DataContext";
import { calculateResources, calculateResourceUpdates, calculateTime, formatTime, handleCancelBuildingFlag, updateAfterBuilding, updateStartTime } from "@/utils/function/function";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const icons = [
    './metal-plate.svg',
    './substrate.svg',
    './moisture.svg',
    './deuterium.svg',
    './energy.svg',
]

const ResourceInfo = ({
    value,
    icon,
    color = '',
}: {
    value: any
    icon: string
    color?: string
}) => (
    <div className='flex items-center justify-center w-full'>
        <span className={`text-[10px] font-normal w-[25%] ${color}`}>{value}</span>
        <img src={icon} alt='' />
    </div>
)

const ResourceStats = ({ state, isValid, level }: any) => (
    <div className='flex w-full flex-col items-center justify-center gap-y-2'>
        {
            Object.values(state?.conditions).map((resource: any, index: number) => (
                (resource !== 0 && <ResourceInfo key={index} value={calculateResources(resource, state?.factor, level).toLocaleString()} icon={icons[index]} color={!isValid?.[index] ? 'text-[red]' : ''} />)
            ))
        }
    </div>
)

const CardInfo = () => (
    <PopoverContent className='p-0 bg-[#414141] border-none rounded-[10px]'>
        <div className='bg-[#414141] rounded-[10px] text-center py-1'>
            <p className='text-sm font-normal'>Info</p>
        </div>
        <div className='bg-gradient-to-r from-[#848484] to-[#343434] py-1 px-2'>
            <p className='text-[10px] font-bold font-robotoMono'>
                Entrance & exit corridors
            </p>
            <p className='text-[10px] font-normal font-robotoMono '>
                The entrance and exit structures enable more efficient transport of
                resources and increase movement speed within your ant colony. The more
                and better-upgraded entrances and exits you have, the faster resources
                can be transported from one place to another. Invest in these structures
                to maximize your base's efficiency!
            </p>
            <p className='text-[10px] font-bold font-robotoMono'>
                Stage 2 (per hour)
            </p>
            <div className='text-[10px] font-normal font-robotoMono w-[60%]'>
                {[
                    { value: '+10% (+870)', label: 'Metal', color: 'text-[#05ff00]' },
                    { value: '+5% (+350)', label: 'Substrate', color: 'text-[#05ff00]' },
                    { value: '+0% (+0)', label: 'Moisture' },
                    { value: '+0% (+0)', label: 'Deuterium' },
                    {
                        value: '-5',
                        label: 'Energy',
                        color: 'text-[#ff0000]',
                        additional: '(35)',
                        additionalColor: 'text-[#05ff00]',
                    },
                ].map(({ value, label, color, additional, additionalColor }, idx) => (
                    <div
                        key={idx}
                        className='flex gap-x-2 justify-between text-[10px] font-normal font-robotoMono'
                    >
                        <span className={color}>{value}</span>
                        {additional && (
                            <span className={additionalColor}>{additional}</span>
                        )}
                        {label}
                    </div>
                ))}
            </div>
        </div>
    </PopoverContent>
)

export const ConfirmModal = ({ category, time, onCancel, item }: { category: string, time: string, onCancel: any, item: string }) => {
    const { data, updateData } = useDataContext();
    const handleProceed = () => {
        handleCancelBuildingFlag(true);
        const wallet = window.localStorage.getItem('address');
        const newStartTime = Date.now();
        if (wallet) {
            const handleStartTime = async () => {
                const response = await updateStartTime(wallet, category, item, newStartTime, true);
                if (response) {
                    updateData('categories', {
                        ...data.categories, // Spread the current categories
                        [category]: {
                            //@ts-ignore
                            ...data.categories?.[category], // Spread the current category items
                            [item]: {
                                //@ts-ignore
                                ...data.categories?.[category][item], // Spread the current values of the specific item
                                startTime: newStartTime, // Update the startTime
                                progress: true, // Update the progress
                            },
                        },
                    });
                }
            };
            handleStartTime();
        }
        onCancel();
    }
    return (
        <PopoverContent className='p-0 bg-[#414141] border-none rounded-[10px] text-white'>
            <div className='bg-[#414141] rounded-[10px] text-center py-1'>
                <p className='text-xs font-normal'>Confirm [{time}]</p>
            </div>
            <div className='bg-gradient-to-r from-[#848484] to-[#343434] py-1 px-2'>
                <div className='px-1 text-[12px]'>Proceed ?</div>
                <div className='flex justify-around text-[10px] mt-3'>
                    <div className='text-[#05ff00] cursor-pointer' onClick={handleProceed}>[Yes]</div>
                    <div className='text-[#ff0000] cursor-pointer' onClick={onCancel}>[Cancel]</div>
                </div>
            </div>
        </PopoverContent>
    )
}

export const CardHeader = ({ title, level, category }: { title: string, level: number, category: string }) => (
    <div className='flex justify-between bg-[#181818] px-[3px] py-2'>
        <p className='text-xs font-normal'>{title} - {`${category === 'SpaceshipYard' ? `[${level}]` : `[Stage ${level === 0 ? 'N/A' : level}]`}`}</p>
        <PopoverTrigger>
            <p className='w-[15px] h-[15px] rounded-full bg-[#888888] flex justify-center items-center cursor-pointer'>
                <span className='text-[10px] font-normal text-white'>?</span>
            </p>
        </PopoverTrigger>
        <CardInfo />
    </div>
)

const CardFooter = ({ category, time, isValid, item, isProgress, isBuilding }: { category: string, time: any, isValid: boolean, item: string, isProgress: boolean, isBuilding: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const { data, updateData } = useDataContext();

    const handleCancelBuilding = () => {
        handleCancelBuildingFlag(false);
        const wallet = window.localStorage.getItem('address');
        const newStartTime = 0;
        if (wallet) {
            const handleStartTime = async () => {
                const response = await updateStartTime(wallet, category, item, newStartTime, false);
                if (response) {
                    updateData('categories', {
                        ...data.categories, // Spread the current categories
                        [category]: {
                            //@ts-ignore
                            ...data.categories?.[category], // Spread the current category items
                            [item]: {
                                //@ts-ignore
                                ...data.categories?.[category][item], // Spread the current values of the specific item
                                startTime: newStartTime, // Update the startTime
                                progress: false, // Update the progress
                            },
                        },
                    });
                }
            };
            handleStartTime();
        }
        setIsCancel(false);
    }
    return (
        <div className='flex justify-between bg-[#181818] items-center px-[3px] py-2'>
            {
                isBuilding ?
                    <Popover open={isCancel} onOpenChange={setIsCancel}>
                        <PopoverTrigger>
                            <div className='text-[#ff0000] text-xs font-normal cursor-pointer'>X</div>
                        </PopoverTrigger>
                        <PopoverContent className='p-0 bg-[#414141] border-none rounded-[10px] text-white'>
                            <div className='bg-[#414141] rounded-[10px] text-center py-1'>
                                <p className='text-xs font-normal'>Confirm [{time}]</p>
                            </div>
                            <div className='bg-gradient-to-r from-[#848484] to-[#343434] py-1 px-2'>
                                <div className='px-1 text-[12px]'>Really Cancel ?</div>
                                <div className='flex justify-around text-[10px] mt-3'>
                                    <div className='text-[#05ff00] cursor-pointer' onClick={handleCancelBuilding}>[Yes]</div>
                                    <div className='text-[#ff0000] cursor-pointer' onClick={() => setIsCancel(false)}>[Close]</div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    :
                    <span className='text-[#ff0000] text-xs font-normal'>X</span>
            }
            <span className={`text-xs font-normal flex flex-row items-center gap-2 ${isBuilding ? 'text-[#05ff00]' : ''}`}>
                <Timer />
                {time}{' '}
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    {
                        !isProgress && isValid ?
                            <PopoverTrigger>
                                [build]
                            </PopoverTrigger> :
                            <>
                                {isBuilding ? '[building]' : '[build]'}
                            </>
                    }
                    <ConfirmModal category={category} time={time} onCancel={() => setIsOpen(false)} item={item} />
                </Popover>
            </span>
        </div>
    )
}


export const CardItem = ({ category, isProgress, additionalData, currentResources, isValid, defaultData }: any) => {
    const { data, updateData } = useDataContext();
    //@ts-ignore
    const dynamicData = data?.categories?.[category]?.[additionalData?.item];
    const [remainingTime, setRemainingTime] = useState(formatTime(defaultData?.requiredTime * (1 + (defaultData?.factor - 1) * dynamicData?.level)));

    useEffect(() => {
        const handleTracking = async () => {
            const endTime: number = dynamicData?.startTime + defaultData?.requiredTime * (1 + (defaultData?.factor - 1) * dynamicData?.level) * 1000;
            const result = await calculateTime(
                dynamicData?.startTime,
                endTime,
                setRemainingTime
            );
            if (result === 0) {
                const wallet = window.localStorage.getItem('address');
                const resourceUpdates = calculateResourceUpdates(currentResources, defaultData?.conditions, defaultData?.factor, dynamicData?.level);
                const itemUpdates = {
                    level: dynamicData?.level + 1,
                    startTime: 0,
                    endTime: endTime,
                    progress: false,
                }
                if (wallet) {
                    const handleAfterBuilding = async () => {
                        const response = await updateAfterBuilding(wallet, resourceUpdates, category, additionalData.item, itemUpdates);
                        if (response) {
                            updateData('categories', {
                                ...data.categories, // Spread the current categories
                                [category]: {
                                    //@ts-ignore
                                    ...data.categories?.[category], // Spread the current category items
                                    [additionalData.item]: itemUpdates,
                                },
                            });
                            updateData('resources', {
                                ...data.resources,
                                Metal: currentResources?.Metal - calculateResources(defaultData?.conditions?.Metal, defaultData?.factor, dynamicData?.level),
                                Substrate: currentResources?.Substrate - calculateResources(defaultData?.conditions?.Substrate, defaultData?.factor, dynamicData?.level),
                                Moisture: currentResources?.Moisture - calculateResources(defaultData?.conditions?.Moisture, defaultData?.factor, dynamicData?.level),
                                Deuterium: currentResources?.Deuterium - calculateResources(defaultData?.conditions?.Deuterium, defaultData?.factor, dynamicData?.level),
                                Energy: {
                                    ...data.resources.Energy,
                                    consumed: currentResources?.Energy?.consumed + calculateResources(defaultData?.conditions?.Energy, defaultData?.factor, dynamicData?.level)
                                }
                            });
                        }
                    };
                    handleAfterBuilding();
                }
            }
        }
        handleTracking();
    }, [defaultData?.requiredTime, defaultData?.factor, dynamicData?.level, dynamicData?.startTime, data]);

    return (
        <div
            className={`
				min-w-[325.33px] 
				${isProgress || isValid?.[(isValid?.length || 1) - 1] === false ? "text-[grey] cursor-not-allowed" : ""}
				${dynamicData?.progress === true ? 'border-[green] border-[3px]' : ''}
				`}
        >
            <Popover>
                <CardHeader title={additionalData?.title} level={dynamicData?.level} category={category} />
            </Popover>
            <div className="bg-black flex justify-between">
                <ResourceStats state={defaultData} isValid={isValid} level={dynamicData?.level} />
                <img src={additionalData?.img} alt="" className="w-[135px] h-[135px]" />
            </div>
            <CardFooter
                category={category}
                time={remainingTime}
                isValid={isValid?.[(isValid?.length || 1) - 1]}
                item={additionalData?.item}
                isProgress={isProgress}
                isBuilding={dynamicData?.progress}
            />
        </div>
    );
};