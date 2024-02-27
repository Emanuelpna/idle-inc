import { defineStore } from "pinia";

import { IncomeQueue } from "../../data/useCases/queue/IncomeQueue";
import { ScientificNumber } from "../../domain/models/scientificNumber/ScientificNumber";
import { ScientificNumberCalculator } from "../../domain/models/scientificNumber/ScientificNumberCalculator";

interface BankStoreState {
  coins: ScientificNumber;
  coinsQueue: IncomeQueue;
}

export const useBankStore = defineStore("bank", {
  state: (): BankStoreState => ({
    coins: new ScientificNumber(0),
    coinsQueue: new IncomeQueue(),
  }),
  getters: {
    getCoins: (state) => state.coins,
    getCoinsQueue: (state) => state.coinsQueue,
  },
  actions: {
    addIncomeToCoinsQueue(income: ScientificNumber) {
      this.coinsQueue.addIncome(income);
    },
    evaluateCoinsQueue() {
      const income = this.coinsQueue.evaluate();

      this.coins = ScientificNumberCalculator.sum(
        this.coins as ScientificNumber,
        income
      );
    },
  },
});
