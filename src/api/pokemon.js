import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemonList = async ({ offset = 0, limit = 10 }) => {
    const { data } = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)
    return data
}

export const getPokemonDetail = async (name) => {
    const { data } = await axios.get(`${BASE_URL}/pokemon/${name}`)
    return data
}

export const getPokemonSpecies = async (name) => {
    const baseName = name.split('-')[0]
    const { data } = await axios.get(`${BASE_URL}/pokemon-species/${baseName}`)
    return data
}

export const getAbilityDetail = async (name) => {
    const { data } = await axios.get(`${BASE_URL}/ability/${name}`)
    return data
}

export const getAllPokemon = async () => {
    const { data } = await axios.get(`${BASE_URL}/pokemon?limit=1350&offset=0`)
    return data.results
}

export const getAllTypes = async () => {
    const { data } = await axios.get(`${BASE_URL}/type?limit=20`)
    return data.results
}

export const getPokemonByType = async (type) => {
    const { data } = await axios.get(`${BASE_URL}/type/${type}`)
    return data.pokemon.map(p => p.pokemon)
}