import { defineStore } from 'pinia';
import { fetchPokemonsList, getPokemonInfo, searchPokemon } from '../api/pokeapi';

interface Pokemon {
  id: number;
  name: string;
  location_area_encounters: string;
  image: string;
  stats: Stat;
  types: Type[];
}

interface Stat {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Type {
  name: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  isLoading: boolean;
  isFiltered: boolean;
  selectedPokemon: Pokemon | null;
  searchQuery: string;
  selectedTypes: string[];
  error: boolean;
  searchedPokemon: Pokemon | null;
}

function mapStats(stats: any[]): Stat {
  return stats.reduce(
    (acc: Partial<Stat>, stat) => {
      switch (stat.stat.name) {
        case 'hp':
          acc.hp = stat.base_stat || 0;
          break;
        case 'attack':
          acc.attack = stat.base_stat || 0;
          break;
        case 'defense':
          acc.defense = stat.base_stat || 0;
          break;
        case 'special-attack':
          acc.special_attack = stat.base_stat || 0;
          break;
        case 'special-defense':
          acc.special_defense = stat.base_stat || 0;
          break;
        case 'speed':
          acc.speed = stat.base_stat || 0;
          break;
        default:
          break;
      }
      return acc;
    },
    {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
    } as Partial<Stat>
  ) as Stat;
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemons: [],
    isLoading: false,
    selectedPokemon: null,
    searchQuery: '',
    selectedTypes: [],
    error: false,
    isFiltered: false,
    searchedPokemon: null
  }),

  getters: {
    getSortedPokemons(state): Pokemon[] {
      return state.pokemons.slice().sort((a, b) => a.id - b.id);
    },
    getLoadingState(state): boolean {
      return state.isLoading;
    },
    getError(state): boolean {
      return state.error;
    },
    getIsFiltered(state): boolean {
      return state.isFiltered;
    },
    getSearchedPokemon(state): Pokemon | null{
      return state.searchedPokemon;
    }

  },

  actions: {
    async fetchPokemons() {
      const offset = this.$state.pokemons.length;
      try {
        const fetchedData = await fetchPokemonsList(offset);
        const pokemonsList = fetchedData.results;
        const pokemonPromises = pokemonsList.map((pokemon) => getPokemonInfo(pokemon.url));
        const pokemonInfos = await Promise.all(pokemonPromises);
        const pokemons = pokemonInfos.map((pokemonInfo) => ({
          id: pokemonInfo.id,
          name: pokemonInfo.forms[0].name,
          image: pokemonInfo.sprites.front_default,
          types: pokemonInfo.types.map((typeData) => ({
            name: typeData.type.name,
          })),
          location_area_encounters: '',
          stats: mapStats(pokemonInfo.stats),
        }));
        this.$state.pokemons = pokemons;
      } catch (error) {
        console.error('Failed to fetch pokemons:', error);
      }
    },
    async fetchMorePokemons() {
      const offset = this.$state.pokemons.length;
      try {
        const fetchedData = await fetchPokemonsList(offset);
        const pokemonsList = fetchedData.results;
        const pokemonPromises = pokemonsList.map((pokemon) => getPokemonInfo(pokemon.url));
        const pokemonInfos = await Promise.all(pokemonPromises);
        const pokemons = pokemonInfos.map((pokemonInfo) => ({
          id: pokemonInfo.id,
          name: pokemonInfo.forms[0].name,
          image: pokemonInfo.sprites.front_default,
          types: pokemonInfo.types.map((typeData) => ({
            name: typeData.type.name,
          })),
          location_area_encounters: '',
          stats: mapStats(pokemonInfo.stats)
        }));
        this.$state.pokemons = [...this.$state.pokemons, ...pokemons];
      } catch (error) {
        console.error('Failed to fetch more pokemons:', error);
      }
    },
    async fetchPokemonByName(query: string) {
      try {
        const fetchedData = await searchPokemon(query.toLowerCase());
        const pokemon = {
          id: fetchedData.id,
          name: fetchedData.forms[0].name,
          image: fetchedData.sprites.front_default,
          types: fetchedData.types.map((typeData) => ({
            name: typeData.type.name,
          })),
          location_area_encounters: '',
          stats: mapStats(fetchedData.stats)
        };
        this.$state.searchedPokemon = pokemon;
        console.log( this.$state.searchedPokemon)
      } catch (error) {
        this.$state.searchedPokemon = null
        console.error('Failed to search pokemon by name:', error);
      }
    },
    sortPokemons() {
      this.$state.pokemons = [...this.$state.pokemons].sort((a, b) => a.id - b.id);
    },
    changeIsFiltered() {
      this.$state.isFiltered = !this.$state.isFiltered;
    },
    clearSearchedPokemon() {
      this.$state.searchedPokemon = null;
    }
  }
});
