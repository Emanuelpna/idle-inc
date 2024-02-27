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
      console.log({ id });

      if (this.activeBuildings.has(id)) return;

      const building = this.buildings.get(id);

      if (!building) return;

      this.activeBuildings.set(building.id, building);

      const bankStore = useBankStore();

      console.log(building.tickSpeed * 1000);

      const gameLoopId = setInterval(() => {
        console.log({ income: building.income });

        bankStore.addIncomeToCoinsQueue(building.income as ScientificNumber);
      }, 1000);

      building.setGameLoopId(gameLoopId);
    },
    increaseBuildingLevel(id: string, quantity: number) {
      const building = this.buildings.get(id);

      if (!building) return;

      building.bumpLevel(quantity);
    },
    resetBuilding(buildingId: string) {
      this.activeBuildings.delete(buildingId);

      const building = this.buildings.get(buildingId);

      if (!building) return;

      building.resetBuilding();
    },
  },
});
