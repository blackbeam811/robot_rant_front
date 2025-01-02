import { useEffect, useState } from "react"
import { useDataContext } from "@/utils/context/DataContext";
import { calculateTime } from "@/utils/function/function";
import { basicData } from "@/utils/database/data"

export const TimeTracker = ({ category }: { category: string }) => {
    const { data } = useDataContext();
    const [time, setTime] = useState<any>('__:__:__');
    const [item, setItem] = useState('');
    const [level, setLevel] = useState();
    const defaultData: any = basicData?.categories?.[category];
    //@ts-ignore
    const dynamicData: any = data?.categories?.[category];

    useEffect(() => {
        const handleTracking = async () => {
            let selectedItem: any;
            let selectedItemData: any;
            let found = false; // Flag to track if a progress item is found
            for (const item in dynamicData) {
                const itemData = dynamicData?.[item];
                if (itemData?.progress && !found) {
                    const selectingItem = itemData;
                    const selectingItemData = defaultData?.[item];
                    const duration = selectingItemData?.requiredTime * (1 + (selectingItemData?.factor - 1) * selectingItem?.level);
                    const endTime = selectingItem?.startTime + duration * 1000;
                    const sessionTime = Date.now();
                    if(endTime > sessionTime) {
                        selectedItem = itemData;
                        selectedItemData = defaultData?.[item];
                        setItem(item);
                        setLevel(selectedItem.level);
                        found = true; // Mark as found to stop resetting values
                    }
                }
            }

            // If no progress items are found, reset values
            if (!found) {
                setItem('');
                setLevel(undefined);
            }
            const endTime: number = selectedItem?.startTime + selectedItemData?.requiredTime * (1 + (selectedItemData?.factor - 1) * selectedItem?.level) * 1000;
            await calculateTime(
                selectedItem?.startTime,
                endTime,
                setTime,
            );
        }
        handleTracking();
    }, [data])
    return (
        <div className="flex flex-row items-center">
            <div className="pr-1 w-[100px] font-kronaOne font-bold">{time !== 'NaN:NaN:NaN' ? time : '-'}</div>
            <div className="pl-3 font-robotoMono">{item}</div>
            <div className="pl-3 font-robotoMono">{level !== undefined && `[${level}]`}</div>
        </div>
    )
}