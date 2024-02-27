<script setup lang="ts">
import { onMounted } from 'vue'

import { Building } from "./domain/models/Building";

import { useBankStore } from "./infra/stores/bankStore";
import { useBuildingsStore } from "./infra/stores/buildingsStore";

const bankStore = useBankStore()
const buildingsStore = useBuildingsStore()


onMounted(() => {
  buildingsStore.addBuilding(new Building('casamata', 'Casamata', 1))

  setInterval(() => {
    console.log('tick')

    bankStore.evaluateCoinsQueue()
  }, 100)
})

</script>

<template>
  <div>
    {{ bankStore.coins }} Coins
  </div>

  <ul>
    <li v-for="building in buildingsStore.buildings.values()">
      <button :class="{
        buyed:
          buildingsStore.activeBuildings.has(building.id)
      }" @click.prevent="() => buildingsStore.buyBuilding(building.id)">
        {{ building.name }}
      </button>
    </li>
  </ul>

  <hr>

  <ul>
    <li v-for="building in buildingsStore.activeBuildings.values()">
      {{ building.name }} ({{ building.gameLoopId }})
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
