import { Queue } from "../../models/Queue";
import { ScientificNumber } from "../../../domain/models/scientificNumber/ScientificNumber";
import { ScientificNumberCalculator } from "../../../domain/models/scientificNumber/ScientificNumberCalculator";

export class IncomeQueue extends Queue<ScientificNumber> {
  addIncome(value: ScientificNumber) {
    this._enqueue(value);
  }

  evaluate() {
    let totalIncome = new ScientificNumber(0, 0);

    for (let index = 0; index < this._queue.length; index++) {
      const income = this._dequeue();

      if (!income) continue;

      totalIncome = ScientificNumberCalculator.sum(totalIncome, income);
    }

    return totalIncome;
  }
}
