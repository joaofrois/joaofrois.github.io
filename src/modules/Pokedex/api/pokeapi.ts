
import axios from 'axios'
import apiConfig from '@/lib/config'
import type { PokemonList, PokemonInfo } from '@/models/pokeapi'

const BASE_URL = apiConfig.baseUrl

export async function fetchPokemonsList(offset: number): Promise<PokemonList> {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/?limit=20&offset=${offset}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Pokemons:', error)
    throw error
  }
}

export async function getPokemonInfo(url: string): Promise<PokemonInfo> {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Pokemons:', error)
    throw error
  }
}

export async function searchPokemon(query: string): Promise<PokemonInfo> {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${query}`)
    return response.data
  } catch (error) {
    console.error('Wrong Pokemon name or id:', error)
    throw error
  }
}
