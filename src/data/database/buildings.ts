import { Building } from "../../domain/models/Building";
import { ScientificNumber } from "../../domain/models/scientificNumber/ScientificNumber";

/**
 * TODO:
 *
 * - Each Buildings have unique perks and falhas (and with different tiers to be unlocked as the game progress, maybe with something like a deck builder or buying with some prestige coin)
 * - Some are has fast production time but has low income
 * - Some has high income but with low production speed
 * - Some has multiple slots of buff and maybe has low stats based on the tier (the lower the tier the lower the stats so expensive ones has higher tiers)
 * - Some has NO slot of buff but has increased stats (with same progression of expensier it is, more stats it has)
 * -
 */

export const buildingsDatabase = [
  new Building(
    "casamata",
    "Casamata",
    "Prédio Casamata",
    null,
    0,
    new ScientificNumber(5),
    1,
    0.1
  ),
  new Building(
    "marauder",
    "Marauder",
    "Prédio Marauder",
    null,
    0,
    new ScientificNumber(10),
    1,
    0.5
  ),
];
