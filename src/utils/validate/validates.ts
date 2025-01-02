import { calculateResources } from "../function/function";

export const validateResources = (category: string, basicData: any, playerSchema: any) => {
    const handleValidateResources = (currentResources: any, requiredConditions: any, factor: number, level: number) => {
        if (!requiredConditions) return null;
    
        const availableEnergy =
            currentResources?.Energy?.total - currentResources?.Energy?.consumed;
    
        const results: any = {};
    
        if (requiredConditions?.Metal !== undefined) {
            results.Metal = calculateResources(requiredConditions?.Metal, factor, level) <= currentResources?.Metal;
        }
        if (requiredConditions?.Substrate !== undefined) {
            results.Substrate = calculateResources(requiredConditions?.Substrate, factor, level) <= currentResources?.Substrate;
        }
        if (requiredConditions?.Moisture !== undefined) {
            results.Moisture = calculateResources(requiredConditions?.Moisture, factor, level) <= currentResources?.Moisture;
        }
        if (requiredConditions?.Deuterium !== undefined) {
            results.Deuterium = calculateResources(requiredConditions?.Deuterium, factor, level) <= currentResources?.Deuterium;
        }
        if (requiredConditions?.Energy !== undefined) {
            results.Energy = calculateResources(requiredConditions?.Energy, factor, level) <= availableEnergy;
        }
    
        return results;
    };

    const currentResources: any = playerSchema?.resources;
    const requiredData: any = Object.values(basicData?.categories?.[category]);
    const playerLevels: any = Object.values(playerSchema?.categories?.[category]);

    const validationResults = requiredData.map((item: any, index: any) => {
        const requiredConditions = item?.conditions;
        const factor = item?.factor;
        const validation = handleValidateResources(currentResources, requiredConditions, factor, playerLevels?.[index]?.level);
        const cardValidation = Object.values(validation).every((status) => status);
        const result = Object.values(validation);
        result.push(cardValidation)
        return result
    });

    return validationResults;
}