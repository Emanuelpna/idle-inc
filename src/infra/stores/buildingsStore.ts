import { defineStore } from "pinia";

import { Building } from "../../domain/models/Building";
import type { ScientificNumber } from "../../domain/models/scientificNumber/ScientificNumber";

import { useBankStore } from "./bankStore";

interface BuildingStoreState {
  buildings: Map<string, Building>;
  activeBuildings: Map<string, Building>;
}

export const useBuildingsStore = defineStore("buildings", {
  state: (): BuildingStoreState => ({
    buildings: new Map(),
    activeBuildings: new Map(),
  }),
  getters: {
    getAllBuildings: (state) => state.buildings,
    getActiveBuildings: (state) => state.activeBuildings,
    getBuildingByID: (state) => (buildingId: string) =>
      state.buildings.get(buildingId),
    getActiveBuildingByID: (state) => (buildingId: string) =>
      state.activeBuildings.get(buildingId),
  },
  actions: {
    addBuilding(building: Building) {
      this.buildings.set(building.id, building);
    },
    buyBuilding(id: string) {
      if (this.activeBuildings.has(id)) return;

      const building = this.buildings.get(id) as Building;

      if (!building) return;

      const bankStore = useBankStore();

      bankStore.deductCoins(building.cost);

      building.bumpLevel(1);

      this.activeBuildings.set(building.id, building);

      this.resetBuildingLoop(building);
    },
    increaseBuildingLevel(id: string, quantity: number) {
      const building = this.buildings.get(id) as Building;

      if (!building) return;

      const bankStore = useBankStore();

      for (let index = 0; index < quantity; index++) {
        bankStore.deductCoins(building.cost);

        building.bumpLevel(1);
      }

      this.resetBuildingLoop(building);
    },
    resetBuilding(buildingId: string) {
      this.activeBuildings.delete(buildingId);

      const building = this.buildings.get(buildingId);

      if (!building) return;

      building.resetBuilding();
    },
    resetBuildingLoop(building: Building) {
      const bankStore = useBankStore();

      bankStore.addMultipliers(
        "speedProduction",
        building.speedProductionBonus
      );
      bankStore.addMultipliers("income", building.incomeBonus);

      const gameLoopId = setInterval(() => {
        bankStore.addIncomeToCoinsQueue(building.income as ScientificNumber);
      }, 1000 * bankStore.multiplier.getSpeedProductionMultipliers() * building.buff.multiplier.getSpeedProductionMultipliers());

      building.setGameLoopId(gameLoopId);
    },
  },
});
