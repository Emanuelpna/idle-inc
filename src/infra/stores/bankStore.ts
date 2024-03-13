import { defineStore } from "pinia";

import { Multiplier } from "../../domain/models/multipliers/Multiplier";
import { ScientificNumber } from "../../domain/models/scientificNumber/ScientificNumber";
import { ScientificNumberCalculator } from "../../domain/models/scientificNumber/ScientificNumberCalculator";

import { IncomeQueue } from "../../data/useCases/queue/IncomeQueue";
import { BankRepository } from "../../data/repositories/BankRepository";

import { useBuildingsStore } from "./buildingsStore";
import { LocalStorageDatabase } from "../database/LocalStorageDatabase";

const bankRepository = new BankRepository(
  new LocalStorageDatabase<BankStoreState>()
);

interface BankStoreState {
  multiplier: Multiplier;
  coins: ScientificNumber;
  coinsQueue: IncomeQueue;
}

export const useBankStore = defineStore("bank", {
  state: (): BankStoreState => ({
    multiplier: new Multiplier(1, 1),
    coins: new ScientificNumber(0),
    coinsQueue: new IncomeQueue(),
  }),
  getters: {
    getCoins: (state) => state.coins,
    getCoinsQueue: (state) => state.coinsQueue,
  },
  actions: {
    addIncomeToCoinsQueue(income: ScientificNumber) {
      const totalIncome = ScientificNumberCalculator.multiply(
        income,
        this.multiplier.getIncomeMultipliers()
      );

      this.coinsQueue.addIncome(totalIncome);
    },
    evaluateCoinsQueue() {
      const income = this.coinsQueue.evaluate();

      this.coins = ScientificNumberCalculator.sum(
        this.coins as ScientificNumber,
        income
      );

      const coins = this.coins as ScientificNumber;

      const buildingStore = useBuildingsStore();

      for (const building of buildingStore.buildings.values()) {
        const buildingCost = building.cost as ScientificNumber;

        const isLess = ScientificNumberCalculator.isGreaterThanOrEqual(
          coins,
          buildingCost
        );

        const isGreaterThanZero =
          ScientificNumberCalculator.isGreaterThanOrEqual(
            ScientificNumberCalculator.subtract(coins, buildingCost),
            0
          );

        building.isBuyable = isLess && isGreaterThanZero;
      }
    },
    deductCoins(value: ScientificNumber) {
      this.coins = ScientificNumberCalculator.subtract(
        this.coins as ScientificNumber,
        value
      );
    },
    addMultipliers(type: "speedProduction" | "income", multiplier: number) {
      if (type === "income") this.multiplier.incomeMultiplier *= multiplier;

      if (type === "speedProduction")
        this.multiplier.speedProductionMultiplier *= multiplier;
    },
    backupData() {
      bankRepository.save(this.$state as BankStoreState);
    },
    restoreData() {
      const data = bankRepository.getAll();

      if (!data) return;

      this.coins = ScientificNumber.toModel(data.coins);
      this.multiplier = Multiplier.toModel(data.multiplier);
      this.coinsQueue = IncomeQueue.toModel(data.coinsQueue);
    },
  },
});
