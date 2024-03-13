import { Multiplier } from "../multipliers/Multiplier";

export enum BUFF_TYPE {
  INCOME = "income",
  SPEED_PRODUCTION = "speed_production",
  COST_REDUCTION = "cost_reduction",
  OFFLINE_PRODUCTION = "offline_production",
  ONLINE_PRODUCTION = "online_production",
}

export class Buff {
  constructor(
    public name: string,
    public description: string,
    public multiplier: Multiplier
  ) {}
}
