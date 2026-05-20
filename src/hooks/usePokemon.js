import { useQuery } from '@tanstack/react-query'
import {
    getPokemonList,
    getPokemonDetail,
    getPokemonSpecies,
    getAbilityDetail,
    getAllPokemon,
    getAllTypes,
    getPokemonByType,
} from '../api/pokemon'

export const usePokemonList = ({ offset, limit }) => {
    return useQuery({
        queryKey: ['pokemonList', offset, limit],
        queryFn: () => getPokemonList({ offset, limit }),
        placeholderData: (previousData) => previousData,
    })
}

export const usePokemonDetail = (name) => {
    return useQuery({
        queryKey: ['pokemonDetail', name],
        queryFn: () => getPokemonDetail(name),
        enabled: !!name,
    })
}

export const usePokemonSpecies = (name) => {
    return useQuery({
        queryKey: ['pokemonSpecies', name],
        queryFn: () => getPokemonSpecies(name),
        enabled: !!name,
    })
}

export const useAbilityDetail = (name) => {
    return useQuery({
        queryKey: ['abilityDetail', name],
        queryFn: () => getAbilityDetail(name),
        enabled: !!name,
    })
}

export const useAllPokemon = () => {
    return useQuery({
        queryKey: ['allPokemon'],
        queryFn: getAllPokemon,
        staleTime: Infinity,
    })
}

export const useAllTypes = () => {
    return useQuery({
        queryKey: ['allTypes'],
        queryFn: getAllTypes,
        staleTime: Infinity,
    })
}

export const usePokemonByType = (type) => {
    return useQuery({
        queryKey: ['pokemonByType', type],
        queryFn: () => getPokemonByType(type),
        enabled: !!type,
        staleTime: Infinity,
    })
}