import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';
import axiosinterface from '@/lib/axios';
import { SERVER_URL, SOLANA_API } from '@/constants/server-url';

export const formatTime = (seconds: number) => {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with leading zeros if needed
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    // Combine into HH:MM:SS format
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export const calculateResources = (requiredAmount: number, factor: number, level: number) => {
    return Math.round(requiredAmount * (factor ** level));
}

export const calculateResourceUpdates = (currentResources: any, requiredResources: any, factor: number, level: number) => {
    const resourceUpdates: any = {};

    // Iterate over requiredResources to construct resourceUpdates
    for (const key in requiredResources) {
        if (requiredResources.hasOwnProperty(key)) {
            if (key === "Energy") {
                // Handle nested Energy object
                resourceUpdates["resources.Energy.consumed"] =
                    (currentResources.Energy.consumed || 0) + calculateResources(requiredResources.Energy, factor, level);
            } else {
                // Directly update flat fields
                resourceUpdates[`resources.${key}`] =
                    (currentResources[key] || 0) - calculateResources(requiredResources[key], factor, level);
            }
        }
    }

    return resourceUpdates;
};

export const calculateTime = async (
    startTime: number,
    endTime: number,
    updateTimeCallback: (formattedTime: string) => void
) => {
    const duration = (endTime - startTime) / 1000;
    const result = await handleClock(startTime, duration, updateTimeCallback);
    return result;
};


let buildingFlag: boolean = true;
export const handleCancelBuildingFlag = (status: boolean) => {
    buildingFlag = status;
}

const handleClock = (
    startTime: number,
    durationInSeconds: number,
    updateTimeCallback: (formattedTime: string) => void
): Promise<number> => {
    return new Promise((resolve) => {
        if (startTime === 0) {
            updateTimeCallback(formatTime(durationInSeconds));
        } else {
            const endTime = startTime + durationInSeconds * 1000;
            const sessionTime = Date.now();
            if (endTime <= sessionTime) {
                updateTimeCallback(formatTime(durationInSeconds));
                resolve(0); // Resolve the promise with 0
                return;
            }

            const Clockinterval = setInterval(() => {
                const currentTime = Date.now();
                const remainingTime = Math.floor((endTime - currentTime) / 1000);
                const formattedTime = formatTime(remainingTime);
                updateTimeCallback(formattedTime); // Pass updated time to the callback
                if (!buildingFlag) {
                    clearInterval(Clockinterval);
                    updateTimeCallback(formatTime(durationInSeconds)); // Notify UI that the countdown is complete
                    return;
                }
                if (remainingTime <= 0) {
                    clearInterval(Clockinterval);
                    updateTimeCallback(formatTime(0));
                    resolve(0); // Resolve the promise with 0
                    return;
                }
            }, 1000);
        }
    });
};


export const fetchBalance = async () => {
    const connection = new Connection(`${SOLANA_API}`);
    const walletAddress = window.localStorage.address;
    const tokenMintAddress = '3BAi3Zm11hFBhiWTC6SHsKzX8rJMYCLgzCCzVRYeYMRa';

    const walletPublicKey = new PublicKey(walletAddress);
    const tokenMintPublicKey = new PublicKey(tokenMintAddress);

    const tokenAccounts = await connection.getTokenAccountsByOwner(walletPublicKey, {
        mint: tokenMintPublicKey,
    });

    if (tokenAccounts.value.length === 0) {
        console.log('No token account found for this mint address.');
        return 0;
    }

    const accountInfo = tokenAccounts.value[0];
    const accountData = accountInfo.account.data;

    // Manually parse account data
    const rawBalance = accountData.readUIntLE(64, 8); // Read the `amount` field from the binary data
    const decimals = 4; // Replace with the token's actual decimals (e.g., USDC uses 6 decimals)

    const tokenBalance = rawBalance / Math.pow(10, decimals);
    return tokenBalance;
};




export const fetchPlayer = async (id: any) => {
    try {
        const response = await axiosinterface.get(`/${id}`);
        return response.data; // Save player data
    } catch (err: any) {
        console.error(err.message); // Handle error
        return null;
    }
};

export const updateStartTime = async (wallet: any, category: string, item: string, newStartTime: number, progress: boolean) => {
    try {
        const response = await axios.put(`${SERVER_URL}/api/players/update-time`, {
            wallet,
            category,
            item,
            newStartTime,
            progress
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating start time:', error.response?.data || error.message);
    }
};

export const updateAfterBuilding = async (wallet: any, resourceUpdates: any, category: string, item: string, itemUpdates: any) => {
    try {
        const response = await axios.put(`${SERVER_URL}/api/players/update-building`, {
            wallet,
            resourceUpdates,
            category,
            item,
            itemUpdates,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating start time:', error.response?.data || error.message);
    }
};

export const updateFarming = async (wallet: any, resourceUpdates: any, itemUpdates: any, item: string) => {
    try {
        const response = await axios.put(`${SERVER_URL}/api/players/update-farming`, {
            wallet,
            resourceUpdates,
            item: item,
            itemUpdates,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating resources:', error.response?.data || error.message);
    }
};

export const resourceGenerate = async (data: any, updateData: any) => {

    const wallet = window.localStorage.getItem('address');
    const resources = data?.resources;
    const itemData = data?.categories?.Farming;

    if (!itemData || !resources || !wallet) return;

    const generateMetal = () => {
        const { level, endTime } = itemData?.IronMine;

        // Ensure level is greater than 0 and sessionTime has passed the endTime
        if (level > 0) {
            // Prevent multiple intervals
            const intervalMetal = setInterval(async () => {
                const currentTime = Date.now();
                if (currentTime > endTime) {
                    const farmedHours = Math.floor((currentTime - endTime) / 3600000); // Hours since endTime

                    if (farmedHours >= 1) {
                        // Calculate new resources
                        const additionalMetal = 500 * 1.05 ** (level - 1) * farmedHours;

                        const resourceUpdates = {
                            ...resources,
                            Metal: (resources?.Metal || 0) + additionalMetal,
                        };

                        const itemUpdates = {
                            ...itemData?.IronMine,
                            endTime: endTime + 3600000 * farmedHours,
                        }

                        // Update item endTime
                        const updatedItem = {
                            ...data?.categories,
                            Farming: {
                                ...data?.categories?.Farming,
                                IronMine: itemUpdates
                            }
                        };

                        // Call backend to persist changes
                        const result = await updateFarming(wallet, resourceUpdates, itemUpdates, 'IronMine');

                        if (result) {
                            // Update frontend state
                            updateData('resources', resourceUpdates);
                            updateData('categories', updatedItem);
                            clearInterval(intervalMetal);
                        }
                    }
                }
            }, 60000);
        }
    }

    const generateSubstrate = () => {
        const { level, endTime } = itemData?.Substrate;

        // Ensure level is greater than 0 and sessionTime has passed the endTime
        if (level > 0) {
            // Prevent multiple intervals
            const intervalSubstrate = setInterval(async () => {
                const currentTime = Date.now();
                if (currentTime > endTime) {
                    const farmedHours = Math.floor((currentTime - endTime) / 3600000); // Hours since endTime

                    if (farmedHours >= 1) {
                        // Calculate new resources
                        const additionalSubstrate = 800 * 1.05 ** (level - 1) * farmedHours;

                        const resourceUpdates = {
                            ...resources,
                            Substrate: (resources?.Substrate || 0) + additionalSubstrate,
                        };

                        const itemUpdates = {
                            ...itemData?.Substrate,
                            endTime: endTime + 3600000 * farmedHours,
                        }

                        // Update item endTime
                        const updatedItem = {
                            ...data?.categories,
                            Farming: {
                                ...data?.categories?.Farming,
                                Substrate: itemUpdates
                            }
                        };

                        // Call backend to persist changes
                        const result = await updateFarming(wallet, resourceUpdates, itemUpdates, 'Substrate');

                        if (result) {
                            // Update frontend state
                            updateData('resources', resourceUpdates);
                            updateData('categories', updatedItem);
                            clearInterval(intervalSubstrate);
                        }
                    }
                }
            }, 60000);
        }
    }

    const generateMoisture = () => {
        const { level, endTime } = itemData?.Moisture;

        // Ensure level is greater than 0 and sessionTime has passed the endTime
        if (level > 0) {
            // Prevent multiple intervals
            const intervalMoisture = setInterval(async () => {
                const currentTime = Date.now();
                if (currentTime > endTime) {
                    const farmedHours = Math.floor((currentTime - endTime) / 3600000); // Hours since endTime

                    if (farmedHours >= 1) {
                        // Calculate new resources
                        const additionalMoisture = 100 * 1.05 ** (level - 1) * farmedHours;

                        const resourceUpdates = {
                            ...resources,
                            Moisture: (resources?.Moisture || 0) + additionalMoisture,
                        };

                        const itemUpdates = {
                            ...itemData?.Moisture,
                            endTime: endTime + 3600000 * farmedHours,
                        }

                        // Update item endTime
                        const updatedItem = {
                            ...data?.categories,
                            Farming: {
                                ...data?.categories?.Farming,
                                Moisture: itemUpdates
                            }
                        };

                        // Call backend to persist changes
                        const result = await updateFarming(wallet, resourceUpdates, itemUpdates, 'Moisture');

                        if (result) {
                            // Update frontend state
                            updateData('resources', resourceUpdates);
                            updateData('categories', updatedItem);
                            clearInterval(intervalMoisture);
                        }
                    }
                }
            }, 60000);
        }
    }

    await generateMetal();
    await generateSubstrate();
    await generateMoisture();
};
