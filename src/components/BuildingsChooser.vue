<script setup lang="ts">

import BuyButton from './BuyButton.vue';

import { useBuildingsStore } from '../infra/stores/buildingsStore'

const buildingsStore = useBuildingsStore()
</script>

<template>
    <ul>
        <li v-for="building in buildingsStore.buildings.values()">
            <BuyButton :is-buyable="building.isBuyable" :title="building.description"
                :on-buy-callback="() => buildingsStore.buyBuilding(building.id)"
                :message="`${building.name} - lvl. ${building.level} (${building.cost}`" />
        </li>
    </ul>
</template>