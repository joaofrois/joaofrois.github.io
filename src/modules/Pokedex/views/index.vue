<template>
  <input type="text" v-model="nameQuery" placeholder="Insert pokemon name" @keyup.enter="searchPokemonByName" />
  <button @click="clearSearch">Clear Search</button>
  <div ref="scrollElement">
    <pokemon-table v-if="!searchedPokemon" :pokemons="sortedPokemons" :checkDetails="checkDetails" />
    <pokemon-table v-else :pokemons="[searchedPokemon]" :checkDetails="checkDetails" />
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Failed to fetch pokemons. Please try again.</div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, onUnmounted } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonTable from '../components/pokemonTable.vue';


export default defineComponent({
  name: 'PokedexHome',

  components: {
    PokemonTable,
  },

  setup() {
    const store = usePokemonStore();
    const isLoading = ref(false);
    const error = ref(false);
    const scrollElement = ref(null)
    const nameQuery = ref("");

    const sortedPokemons = computed(() => store.getSortedPokemons);
    const searchedPokemon = computed(() => store.getSearchedPokemon);
    const isFiltered = computed(() => store.getIsFiltered);

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
      alert(`
      Name: ${e.name}
      Types: ${e.types.map(type => type.name).join(', ')}

      Stats:
      HP: ${e.stats.hp}
      DEF: ${e.stats.defense}
      Atk: ${e.stats.attack}
      SPD: ${e.stats.speed}
      SpAtkk: ${e.stats.special_attack}
      SpDeff: ${e.stats.special_defense}

      Location Areas: 
      ${locationAreas.map(area => area.name).join('\n')}

      `)
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



    return {
      sortedPokemons,
      isLoading,
      error,
      scrollElement,
      checkDetails,
      isFiltered,
      searchedPokemon,
      searchPokemonByName,
      clearSearch,
      nameQuery
    };
  },
});

</script>

<style scoped>
/* Add component-specific styles here */
</style>
