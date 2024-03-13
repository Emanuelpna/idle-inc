<script setup lang="ts">
interface BuyButtonProps {
    title: string;
    message: string;
    isBuyable: boolean;
    onBuyCallback: () => void;
}

defineProps<BuyButtonProps>()
</script>

<template>
    <button :disabled="!isBuyable" :title="title" @click.prevent="onBuyCallback">
        {{ message }} - {{ isBuyable }})
    </button>
</template>