import { useState } from 'react'
import { usePokemonList, useAllPokemon, useAllTypes, usePokemonByType } from './hooks/usePokemon'
import PokemonTable from './components/PokemonTable'
import SearchBar from './components/SearchBar'
import PokemonModal from './components/PokemonModal'
import { AlertTriangle, Search } from 'lucide-react'

const LIMIT = 10

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const offset = (currentPage - 1) * LIMIT

  const { data, isLoading, isError } = usePokemonList({ offset, limit: LIMIT })
  const { data: allPokemon } = useAllPokemon()
  const { data: allTypes } = useAllTypes()
  const { data: pokemonByType } = usePokemonByType(selectedType)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleTypeChange = (type) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const isFiltering = search.length > 0 || !!selectedType

  // Base list según si hay filtro de tipo o no
  const baseList = selectedType
    ? (pokemonByType || [])
    : (allPokemon || [])

  // Filtrar por nombre encima de la base
  const allFiltered = isFiltering
    ? baseList.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const pokemons = isFiltering
    ? allFiltered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
    : data?.results || []

  const paginationProps = isFiltering
    ? {
        next: currentPage * LIMIT < allFiltered.length ? true : null,
        previous: currentPage > 1 ? true : null,
        totalCount: allFiltered.length,
      }
    : {
        next: data?.next,
        previous: data?.previous,
        totalCount: data?.count || 0,
      }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-500 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-red-500" />
            </div>
            <h1 className="text-white text-2xl font-bold tracking-wide">Pokédex</h1>
          </div>
          <SearchBar
            value={search}
            onChange={handleSearch}
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            types={allTypes}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin" />
            <p className="text-gray-400">Cargando Pokémon...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-24 text-red-400">
            <AlertTriangle className="w-10 h-10 mb-4 mx-auto" />
            <p className="font-medium">Error al cargar los Pokémon</p>
          </div>
        ) : pokemons.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Search className="w-10 h-10 mb-4 mx-auto text-gray-300" />
            <p className="font-medium">No se encontró ningún Pokémon</p>
          </div>
        ) : (
          <>
            {isFiltering && (
              <p className="text-sm text-gray-400 mb-4">
                Se encontraron{' '}
                <span className="text-red-500 font-semibold">{allFiltered.length}</span>{' '}
                resultado{allFiltered.length !== 1 ? 's' : ''}
                {search && <> para <span className="text-gray-600 font-medium">"{search}"</span></>}
                {selectedType && <> de tipo <span className="text-gray-600 font-medium capitalize">{selectedType}</span></>}
              </p>
            )}
            <PokemonTable
              pokemons={pokemons}
              next={paginationProps.next}
              previous={paginationProps.previous}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onDoubleClick={setSelectedPokemon}
              totalCount={paginationProps.totalCount}
              limit={LIMIT}
            />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  )
}

export default App