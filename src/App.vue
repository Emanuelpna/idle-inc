<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import BuildingsChooser from './components/BuildingsChooser.vue'

import { ScientificNumber } from './domain/models/scientificNumber/ScientificNumber';
import { ScientificNumberCalculator } from './domain/models/scientificNumber/ScientificNumberCalculator';

import { buildingsDatabase } from "./data/database/buildings";

import { useBankStore } from "./infra/stores/bankStore";
import { useBuildingsStore } from "./infra/stores/buildingsStore";

const bankStore = useBankStore()
const buildingsStore = useBuildingsStore()

/**
 * TODO:
 * - Expand the coins concept to include materials as food, wood, people, ores, stones e and
 * - Buildings that makes critical hits to coin generation
 * - Buildings buff it's coins generation each 50 levels
 * - Buffs are buyed separately than buildings and can be purchased or upgraded by prestige pointes (building card opens a hole once buffs are enabled to indicate when a buff is implemented - and wich one - or not)
 * - [MAYBE] Separate the concept of building coin generation and buffs (but make it as the building needs to be assing to the buff). So people can choose what type of currency they wanna focus for the run or for the moment (like change active buildings for a stretch to build a new building or buy something that use that specific material)
 * - [MAYBE] Buildings that adds multipliers to how long the game is open (and another for closed)
 * - [MAYBE] Buildings that buff game speed
 * - [MAYBE] Building that enable Clicker Mode
 * 
 * PRESTIGES:
 * - First prestige type gives bonus to base attributes (speed production and income) based on total first prestige coin earned in total lifetime on the game
 * - First prestige coin can be used to buy the first tier buffs and second tier buildings
 * - Second prestige type gives bonus to inhanced attributes like online/offline production and cost reduction
 * - Second prestige coin can be used to buy second tier buffs and third tier buildings
 * - Create other unique perks for each prestige type
 * - [MAYBE] Create a third prestige
 */

/** Start Game Setup */
onMounted(() => {
  // useRestoreStoresData()


  for (const building of buildingsDatabase) {
    buildingsStore.addBuilding(building)
  }
})

/** End Game Setup */
onUnmounted(() => {
  // useBackupStoresData()
})


/** Game Loops Setup */
onMounted(() => {
  /** Main Game Loop */
  setInterval(() => {
    // console.log('tick')

    bankStore.evaluateCoinsQueue()
  }, 1000)

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

        <div v-if="building.buff !== null">
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

  <BuildingsChooser></BuildingsChooser>
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
