export const basicData: any = {
	"initialResources": {
		"Metal": 5000,
		"Substrate": 5000,
		"Moisture": 5000,
		"Deuterium": 5000,
		"Energy": {
			"consumed": 0,
			"total": 20
		}
	},
	"categories": {
		"Chambers": {
			"TunnelSystem": {
				"function": "Increase construction speed by 5% per level for all chambers.",
				"conditions": {
					"Metal": 200,
					"Substrate": 100,
					"Moisture": 50,
					"Deuterium": 1,
					"Energy": 1
				},
				"requiredTime": 20,
				"factor": 1.4
			},
			"BreedingChambers": {
				"function": "Increase farming productivity by 8% per level for all farming.",
				"conditions": {
					"Metal": 300,
					"Substrate": 150,
					"Moisture": 100,
					"Deuterium": 2,
					"Energy": 2
				},
				"requiredTime": 5400,
				"factor": 1.4
			},
			"EntranceExitCorridors": {
				"function": "Allows the construction of 5 ships per level.",
				"conditions": {
					"Metal": 250,
					"Substrate": 120,
					"Moisture": 80,
					"Deuterium": 1,
					"Energy": 1
				},
				"requiredTime": 10800,
				"factor": 1.4
			},
			"EnergyCenter": {
				"function": "Increases energy output by 10 per level.",
				"conditions": {
					"Metal": 400,
					"Substrate": 200,
					"Moisture": 150,
					"Deuterium": 5,
					"Energy": 0
				},
				"requiredTime": 4200,
				"factor": 1.6,
				"dependency": [
					{ category: 'EnergySystem', formula: 'times', value: 5 },
				]
			},
			"MineralProcessingPlants": {
				"function": "Increases moisture by 5% per level.",
				"conditions": {
					"Metal": 350,
					"Substrate": 180,
					"Moisture": 120,
					"Deuterium": 3,
					"Energy": 2
				},
				"requiredTime": 17400,
				"factor": 1.5
			},
			"DeuteriumExtractor": {
				"function": "Increases deuterium by 5% per level.",
				"conditions": {
					"Metal": 500,
					"Substrate": 250,
					"Moisture": 150,
					"Deuterium": 4,
					"Energy": 3
				},
				"requiredTime": 6600,
				"factor": 1.4
			},
			"ProductFactories": {
				"function": "Increase productivity in shipbuilding by 5% per level.",
				"conditions": {
					"Metal": 600,
					"Substrate": 300,
					"Moisture": 200,
					"Deuterium": 5,
					"Energy": 4
				},
				"requiredTime": 18600,
				"factor": 1.8
			},
			"ResearchLaboratories": {
				"function": "Necessary for the construction of Energy System and Navigation System.",
				"conditions": {
					"Metal": 800,
					"Substrate": 400,
					"Moisture": 300,
					"Deuterium": 10,
					"Energy": 5
				},
				"requiredTime": 29100,
				"factor": 1.8
			},
			"SatelliteStations": {
				"function": "Increases visibility radius of universe map by 3% per level.",
				"conditions": {
					"Metal": 1000,
					"Substrate": 500,
					"Moisture": 400,
					"Deuterium": 15,
					"Energy": 6
				},
				"requiredTime": 20100,
				"factor": 1.5
			}
		},
		"ResearchLab": {
			"EnergySystem": {
				"function": "Allows construction of additional Energy Centers.",
				"conditions": {
					"Metal": 800,
					"Substrate": 0,
					"Moisture": 0,
					"Deuterium": 200,
					"Energy": 0,
				},
				"requiredTime": 20,
				"factor": 1.4,
				"dependency": [
					{ category: 'ResearchLaboratories', formula: 'plus', value: 4 },
				]
			},
			"NavigationSystem": {
				"function": "Allows the construction of 10 ships per level.",
				"conditions": {
					"Metal": 1000,
					"Substrate": 0,
					"Moisture": 0,
					"Deuterium": 300,
					"Energy": 0,
				},
				"requiredTime": 46200,
				"factor": 1.5,
				"dependency": [
					{ category: 'ResearchLaboratories', formula: 'plus', value: 4 },
				]
			},
			"Spaceshipyard": {
				"function": "Required for advanced ships (e.g., Battleship).",
				"conditions": {
					"Metal": 1500,
					"Substrate": 0,
					"Moisture": 0,
					"Deuterium": 500,
					"Energy": 0,
				},
				"requiredTime": 51000,
				"factor": 1.6
			}
		},
		"SpaceshipYard": {
			"ColonizationShip": {
				"conditions": {
					"Metal": 1200,
					"Substrate": 800,
					"Moisture": 400,
					"Deuterium": 500,
					"Energy": 0,
				},
				"requiredTime": 20,
				"factor": 1,
				"dependency": [
					{ "category": "Spaceshipyard", "formula": "plus", "value": 1 },
					{ "category": "EnergySystem", "formula": "plus", "value": 1 }
				]
			},
			"ScoutSatellites": {
				"conditions": {
					"Metal": 200,
					"Substrate": 50,
					"Moisture": 50,
					"Deuterium": 20,
					"Energy": 0,
				},
				"requiredTime": 9000,
				"factor": 1,
				"dependency": [
					{ "category": "Spaceshipyard", "formula": "plus", "value": 0 },
					{ "category": "NavigationSystem", "formula": "plus", "value": 0 }
				]
			},
			"ExplorationDrones": {
				"conditions": {
					"Metal": 200,
					"Substrate": 50,
					"Moisture": 50,
					"Deuterium": 20,
					"Energy": 0,
				},
				"requiredTime": 12600,
				"factor": 1,
				"dependency": [
					{ "category": "Spaceshipyard", "formula": "plus", "value": 1 },
					{ "category": "ResearchLaboratories", "formula": "plus", "value": 0 }
				]
			},
			"Battleship": {
				"conditions": {
					"Metal": 5000,
					"Substrate": 2200,
					"Moisture": 1800,
					"Deuterium": 600,
					"Energy": 0,
				},
				"requiredTime": 90300,
				"factor": 1,
				"dependency": [
					{ "category": "Spaceshipyard", "formula": "plus", "value": 3 },
					{ "category": "EnergySystem", "formula": "plus", "value": 2 }
				]
			},
			"DefenseShips": {
				"conditions": {
					"Metal": 2500,
					"Substrate": 1800,
					"Moisture": 1000,
					"Deuterium": 200,
					"Energy": 0,
				},
				"requiredTime": 31200,
				"factor": 1,
				"dependency": [
					{ "category": "Spaceshipyard", "formula": "plus", "value": 2 },
					{ "category": "MineralProcessingPlants", "formula": "plus", "value": 2 }
				]
			},
			"ProcessingShips": {
				"conditions": {
					"Metal": 2500,
					"Substrate": 1800,
					"Moisture": 1200,
					"Deuterium": 200,
					"Energy": 0,
				},
				"requiredTime": 45600,
				"factor": 1,
				"dependency": []
			}
		},
		"Farming": {
			"IronMine": {
				"function": "500 metal produced per hour, 5% more per level.",
				"conditions": {
					"Metal": 300,
					"Substrate": 350,
					"Moisture": 200,
					"Deuterium": 0,
					"Energy": 2
				},
				"requiredTime": 20,
				"factor": 1.3
			},
			"Substrate": {
				"function": "800 substrate produced per hour, 5% more per level.",
				"conditions": {
					"Metal": 300,
					"Substrate": 350,
					"Moisture": 200,
					"Deuterium": 0,
					"Energy": 2
				},
				"requiredTime": 7200,
				"factor": 1.4
			},
			"Moisture": {
				"function": "100 Moisture is produced per hour. 5% more per additional level.",
				"conditions": {
					"Metal": 300,
					"Substrate": 350,
					"Moisture": 200,
					"Deuterium": 0,
					"Energy": 2
				},
				"requiredTime": 6300,
				"factor": 1.35
			},
			"WaterPipelines": {
				"function": "increases the productivity of the deuterium extractor 8% more per level",
				"conditions": {
					"Metal": 300,
					"Substrate": 350,
					"Moisture": 200,
					"Deuterium": 0,
					"Energy": 2
				},
				"requiredTime": 7200,
				"factor": 1.5
			}
		}

	},
	"universeMap": {
		"totalPoints": 10000,
		"planetQuantity": {
			"small": 3000,
			"medium": 5000,
			"large": 2000
		},
		"planetCapacity": {
			"small": 245,
			"medium": 305,
			"large": 500
		}
	}
}

export const defaultSchema: any = {
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
		"Metal": 0,
		"Substrate": 0,
		"Moisture": 0,
		"Deuterium": 0,
		"Energy": {
			"consumed": 0,
			"total": 0
		}
	},
	categories: {
		Chambers: {
			TunnelSystem: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			BreedingChambers: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			EntranceExitCorridors: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			EnergyCenter: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			MineralProcessingPlants: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			DeuteriumExtractor: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			ProductFactories: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			ResearchLaboratories: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			SatelliteStations: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
		},
		ResearchLab: {
			EnergySystem: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			NavigationSystem: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			Spaceshipyard: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
		},
		SpaceshipYard: {
			ColonizationShip: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			ScoutSatellites: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			ExplorationDrones: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			Battleship: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			DefenseShips: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			ProcessingShips: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
		},
		Farming: {
			IronMine: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			Substrate: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			Moisture: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
			WaterPipelines: {
				level: 0,
				startTime: 0,
				endTime: 0,
				progress: false,
			},
		}
	}
}