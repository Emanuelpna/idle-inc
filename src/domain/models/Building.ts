import { ScientificNumber } from "./scientificNumber/ScientificNumber";
import { ScientificNumberCalculator } from "./scientificNumber/ScientificNumberCalculator";

export class Building {
  private _baseTickSpeed = 10;
  private _baseIncome = new ScientificNumber(1);

  constructor(
    public id: string,
    public name: string,
    public level: number = 1,
    public gameLoopId: number | null = null
  ) {}

  get income() {
    return ScientificNumberCalculator.multiply(this._baseIncome, this.level);
  }

  get tickSpeed() {
    return this._baseTickSpeed * this.level;
  }

  /**
   * Increase the level of the current building
   * @param quantity The quantity of levels to increase on building
   */
  bumpLevel(quantity: number) {
    this.level += quantity;
  }

  setGameLoopId(gameLoopId: number | null) {
    if (this.gameLoopId !== null) clearInterval(this.gameLoopId);

    this.gameLoopId = gameLoopId;
  }

  resetBuilding() {
    this.level = 1;
    this._baseTickSpeed = 10;
    this._baseIncome = new ScientificNumber();

    if (this.gameLoopId !== null) clearInterval(this.gameLoopId);
  }
}
