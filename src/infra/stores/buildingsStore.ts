import { defineStore } from "pinia";

import { Building } from "../../domain/models/Building";
import { ScientificNumber } from "../../domain/models/scientificNumber/ScientificNumber";

import { BuildingsRepository } from "../../data/repositories/BuildingsRepository";

import { useBankStore } from "./bankStore";
import { LocalStorageDatabase } from "../database/LocalStorageDatabase";

const bankRepository = new BuildingsRepository(
  new LocalStorageDatabase<BuildingStoreBackup>()
);

type BuildingMapToArray = [string, Building][];

interface BuildingStoreBackup {
  activeBuildings: BuildingMapToArray;
}

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
      if (!this.buildings.has(building.id))
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

      const buildingBuffSpeedProductionMultiplier =
        building.buff?.multiplier.getSpeedProductionMultipliers() ?? 1;

      const gameLoopId = setInterval(() => {
        bankStore.addIncomeToCoinsQueue(building.income as ScientificNumber);
      }, 1000 * bankStore.multiplier.getSpeedProductionMultipliers() * buildingBuffSpeedProductionMultiplier);

      building.setGameLoopId(gameLoopId);
    },
    backupData() {
      const activeBuildings = Array.from(
        this.activeBuildings.entries()
      ) as BuildingMapToArray;

      bankRepository.save({
        activeBuildings,
      });
    },
    restoreData() {
      const data = bankRepository.getAll();

      if (!data) return;

      if (data.activeBuildings.length > 0)
        this.activeBuildings = new Map(data.activeBuildings);
    },
  },
});
