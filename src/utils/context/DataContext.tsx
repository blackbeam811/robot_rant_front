import React, { createContext, useState, useContext, useEffect } from 'react';
// import { SERVER_URL } from '@/constants/server-url';
import { fetchPlayer } from '../function/function';

// Define types for the data structure
interface CategoryItem {
    level: number;
    startTime: number;
    endTime: number;
    progress: boolean;
}

interface Resources {
    Metal: number;
    Substrate: number;
    Moisture: number;
    Deuterium: number;
    Energy: {
        consumed: number;
        total: number;
    };
}

interface Categories {
    Chambers: Record<string, CategoryItem>;
    ResearchLab: Record<string, CategoryItem>;
    SpaceshipYard: Record<string, CategoryItem>;
    Farming: Record<string, CategoryItem>;
}

interface Planet {
    map: {
        coordinates: string;
        radius: string;
    };
    size: string;
}

interface Data {
    userInfo: {
        wallet: string;
        userName: string;
    };
    planet: Planet;
    resources: Resources;
    categories: Categories;
}

// Define initial state for data
const initialData: Data = {
    userInfo: {
        wallet: '',
        userName: ''
    },
    planet: {
        map: {
            coordinates: '',
            radius: 'default'
        },
        size: 'small'
    },
    resources: {
        Metal: 0,
        Substrate: 0,
        Moisture: 0,
        Deuterium: 0,
        Energy: {
            consumed: 0,
            total: 0
        }
    },
    categories: {
        Chambers: {
            TunnelSystem: { level: 0, startTime: 0, endTime: 0, progress: false },
            BreedingChambers: { level: 0, startTime: 0, endTime: 0, progress: false },
            EntranceExitCorridors: { level: 0, startTime: 0, endTime: 0, progress: false },
            EnergyCenter: { level: 0, startTime: 0, endTime: 0, progress: false },
            MineralProcessingPlants: { level: 0, startTime: 0, endTime: 0, progress: false },
            DeuteriumExtractor: { level: 0, startTime: 0, endTime: 0, progress: false },
            ProductFactories: { level: 0, startTime: 0, endTime: 0, progress: false },
            ResearchLaboratories: { level: 0, startTime: 0, endTime: 0, progress: false },
            SatelliteStations: { level: 0, startTime: 0, endTime: 0, progress: false },
        },
        ResearchLab: {
            EnergySystem: { level: 0, startTime: 0, endTime: 0, progress: false },
            NavigationSystem: { level: 0, startTime: 0, endTime: 0, progress: false },
            Spaceshipyard: { level: 0, startTime: 0, endTime: 0, progress: false },
        },
        SpaceshipYard: {
            ColonizationShip: { level: 0, startTime: 0, endTime: 0, progress: false },
            ScoutSatellites: { level: 0, startTime: 0, endTime: 0, progress: false },
            ExplorationDrones: { level: 0, startTime: 0, endTime: 0, progress: false },
            Battleship: { level: 0, startTime: 0, endTime: 0, progress: false },
            DefenseShips: { level: 0, startTime: 0, endTime: 0, progress: false },
            ProcessingShips: { level: 0, startTime: 0, endTime: 0, progress: false },
        },
        Farming: {
            IronMine: { level: 0, startTime: 0, endTime: 0, progress: false },
            Substrate: { level: 0, startTime: 0, endTime: 0, progress: false },
            Moisture: { level: 0, startTime: 0, endTime: 0, progress: false },
            WaterPipelines: { level: 0, startTime: 0, endTime: 0, progress: false },
        }
    }
};

// Create Context
const DataContext = createContext<{
    data: Data;
    loading: boolean;
    updateData: (key: keyof Data, value: any) => void;
    setFullData: (newData: Data) => void;
} | null>(null);

// Export custom hook
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

// Provider
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Data>(initialData);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const wallet = window.localStorage.getItem('address');
            if (wallet) {
                try {
                    const response: Data = await fetchPlayer(wallet);
                    if(response) {
                        setData(response);
                    } else {
                        setData(data);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Update method
    const updateData = (key: keyof Data, value: any) => {
        setData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const setFullData = (newData: Data) => {
        setData(newData);
    };

    return (
        <DataContext.Provider value={{ data, loading, updateData, setFullData }}>
            {children}
        </DataContext.Provider>
    );
};
