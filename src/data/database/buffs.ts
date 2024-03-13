import { Buff } from "../../domain/models/buffs/Buff";
import { Multiplier } from "../../domain/models/multipliers/Multiplier";

export const buffsDatabase = [
  new Buff("Income", "Increase all income buff", new Multiplier(1.05, 1)),
  new Buff(
    "Speed Production",
    "Increase all speed production",
    new Multiplier(1.05, 1)
  ),
];
