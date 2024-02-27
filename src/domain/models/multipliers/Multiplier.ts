export class Multiplier {
  public incomePrestigeMultiplier: number = 1;
  public speedProductionPrestigeMultiplier: number = 1;

  constructor(
    public incomeMultiplier: number,
    public speedProductionMultiplier: number
  ) {}

  getIncomeMultipliers() {
    return this.incomeMultiplier * this.incomePrestigeMultiplier;
  }

  getSpeedProductionMultipliers() {
    return (
      this.speedProductionMultiplier * this.speedProductionPrestigeMultiplier
    );
  }

  resetMultipliers() {
    this.incomeMultiplier = 1;
    this.speedProductionMultiplier = 1;
  }
}
