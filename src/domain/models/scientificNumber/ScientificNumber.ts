export class ScientificNumber {
  // The maximum a number can be before changing the expoent (i.e.: (999 x 10^2 + 1) -> 1 x 10^3)
  protected _OFFSET = 1000;

  constructor(public number: number = 0, public expoent: number = 0) {}

  public normalize(): ScientificNumber {
    if (this.number >= this._OFFSET) {
      while (this.number >= this._OFFSET) {
        this.incrementExpoent();
      }
    }

    if (this.number <= -this._OFFSET) {
      while (this.number <= -this._OFFSET) {
        this.incrementExpoent();
      }
    }

    return this;
  }

  public decrementExpoent() {
    this.expoent -= 1;
    this.number *= 10;
  }

  public incrementExpoent() {
    this.expoent += 1;
    this.number /= 10;

    if (this.number < 0) {
      this.number = 0;
    }
  }

  public shrunkExpoent(levels: number) {
    for (let index = 0; index < Math.abs(levels); index++) {
      this.decrementExpoent();
    }
  }

  public bumpExpoent(levels: number) {
    for (let index = 0; index < Math.abs(levels); index++) {
      this.incrementExpoent();
    }
  }

  public toString() {
    return this.expoent > 0
      ? `${this.number.toFixed(2)}e${this.expoent}`
      : `${this.number}`;
  }

  // public toData() {
  //   return {
  //     _OFFSET: this._OFFSET,
  //     _OFFSET: this._OFFSET,
  //     _OFFSET: this._OFFSET,
  //   };
  // }

  static toModel(data: ScientificNumber) {
    const newNumber = new ScientificNumber(data.number, data.expoent);

    return newNumber;
  }
}
