<template>
  <div class="modal-container">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">X</button>
      <PokemonDetails :pokemon="pokemon" />
    </div>
  </div>
</template>

<script setup>
import PokemonDetails from './pokemonDetails.vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.close-button {
  align-self: flex-end;
  font-size: 1.5rem;
  padding: 0.2rem 0.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>