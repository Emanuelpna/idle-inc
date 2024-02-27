<script setup lang="ts">
import { onMounted } from 'vue'

import { Buff } from "./domain/models/buffs/Buff";
import { Building } from "./domain/models/Building";
import { Multiplier } from "./domain/models/multipliers/Multiplier";
import { ScientificNumber } from './domain/models/scientificNumber/ScientificNumber';
import { ScientificNumberCalculator } from './domain/models/scientificNumber/ScientificNumberCalculator';

import { useBankStore } from "./infra/stores/bankStore";
import { useBuildingsStore } from "./infra/stores/buildingsStore";

const bankStore = useBankStore()
const buildingsStore = useBuildingsStore()

// onUnmounted

onMounted(() => {
  buildingsStore.addBuilding(new Building('casamata', 'Casamata', 'Prédio Casamata', new Buff(
    "Income",
    "Increase all income buff",
    new Multiplier(1.05, 1)
  ), 0, new ScientificNumber(5), 1, 1))

  buildingsStore.addBuilding(new Building('marauder', 'Marauder', 'Prédio Marauder', new Buff(
    "Speed Production",
    "Increase all speed production",
    new Multiplier(1.05, 1)
  ), 0, new ScientificNumber(10), 1, 1))

  /** Main Game Loop */
  setInterval(() => {
    // console.log('tick')

    bankStore.evaluateCoinsQueue()
  }, 100)

  /** Basic Income Loop */
  setInterval(() => {
    bankStore.addIncomeToCoinsQueue(
      ScientificNumberCalculator.multiply(
        new ScientificNumber(1, 0),
        bankStore.multiplier.incomePrestigeMultiplier
      )
    )
  }, 1000 * bankStore.multiplier.speedProductionPrestigeMultiplier)
})

</script>

<template>
  <div>
    {{ bankStore.coins }} Coins
  </div>

  <ul>
    <li v-for="building in buildingsStore.activeBuildings.values()">
      <button class="buyed" :disabled="!building.isBuyable" :title="building.description"
        @click.prevent="() => buildingsStore.increaseBuildingLevel(building.id, 1)">

        <div>
          <span>{{ building.buff.name }}</span> -
          <span>
            {{ building.buff.multiplier.getIncomeMultipliers() * 100 }}%
          </span>
        </div>

        <div>
          {{ building.name }}
        </div>

        <div>
          <span>lvl. {{ building.level }}</span>
          <span>{{ building.cost }} coins</span>
        </div>
      </button>
    </li>
  </ul>

  <hr>

  <ul>
    <li v-for="building in buildingsStore.buildings.values()">
      <button :disabled="!building.isBuyable" :title="building.description"
        @click.prevent="() => buildingsStore.buyBuilding(building.id)">
        {{ building.name }} - lvl. {{ building.level }} ({{ building.cost }} - {{ building.isBuyable }})
      </button>
    </li>
  </ul>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
