import { usePokemonStore } from '@/modules/Pokedex/store/pokemonStore';

import { createPinia } from 'pinia';

const pinia = createPinia();

export const store = pinia;


export const pokemonStore = usePokemonStore(pinia);