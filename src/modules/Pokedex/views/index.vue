<template>
  <div class="pokedex-container">
    <div class="search-box">
      <input type="text" v-model="nameQuery" placeholder="Insert pokemon name" @keyup.enter="searchPokemonByName" />
      <button @click="clearSearch">Clear Search</button>
    </div>
    <div class="type-filters">
      <label>
        <input type="checkbox" v-model="selectedTypes" value="water" /> Water
      </label>
      <label>
        <input type="checkbox" v-model="selectedTypes" value="grass" /> Grass
      </label>
      <label>
        <input type="checkbox" v-model="selectedTypes" value="fire" /> Fire
      </label>
    </div>
    <div ref="scrollElement">
      <pokemon-table v-if="!searchedPokemon" :pokemons="filteredPokemons" :checkDetails="checkDetails" />
      <pokemon-table v-else :pokemons="[searchedPokemon]" :checkDetails="checkDetails" />
      <PokemonDetailsModal v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />
      <div v-if="isLoading">Loading...</div>
      <div v-if="error">Failed to fetch pokemons. Please try again.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonTable from '../components/pokemonTable.vue';
import PokemonDetailsModal from '../components/pokemonDetailsModal.vue';

const store = usePokemonStore();
const isLoading = ref(false);
const error = ref(false);
const scrollElement = ref(null)
const nameQuery = ref("");
const selectedPokemon = ref(null);
const selectedTypes = ref([]);

const sortedPokemons = computed(() => store.getSortedPokemons);
const searchedPokemon = computed(() => store.getSearchedPokemon);

onMounted(async () => {
  isLoading.value = true;
  try {
    await store.fetchPokemons();
  } catch (error) {
    console.error('Failed to fetch pokemons:', error);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const handleScroll = async (e) => {
  let element = scrollElement.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    await store.fetchMorePokemons();
  }
}

const checkDetails = async (e) => {
  const locationAreas = await store.fetchPokemonLocationArea(e.location_area_encounters)
  selectedPokemon.value = {
    name: e.name,
    types: e.types,
    stats: {
      hp: e.stats.hp,
      defense: e.stats.defense,
      attack: e.stats.attack,
      speed: e.stats.speed,
      special_attack: e.stats.special_attack,
      special_defense: e.stats.special_defense
    },
    location_area: locationAreas,
    image: e.image
  }
}

const searchPokemonByName = async () => {
  if (nameQuery.value) {
    await store.fetchPokemonByName(nameQuery.value);
  }
};

const clearSearch = () => {
  nameQuery.value = '';
  store.clearSearchedPokemon();
};

const filteredPokemons = computed(() => {
  if (selectedTypes.value.length === 0) {
    return sortedPokemons.value;
  }
  return sortedPokemons.value.filter((pokemon) =>
    pokemon.types.some((type) => selectedTypes.value.includes(type.name))
  );
});
</script>

<style lang="scss" scoped>
.pokedex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-box {
  margin: 1rem;
}
</style>
