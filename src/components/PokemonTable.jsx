import PokemonRow from './PokemonRow'
import Pagination from './Pagination'

const PokemonTable = ({ pokemons, next, previous, currentPage, onPageChange, onDoubleClick, totalCount, limit }) => {
    return (
        <div className="w-full">
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Imagen</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Nombre</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Tipo</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {pokemons.map((pokemon) => (
                            <PokemonRow
                                key={pokemon.name}
                                name={pokemon.name}
                                onDoubleClick={onDoubleClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                next={next}
                previous={previous}
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalCount={totalCount}
                limit={limit}
            />
        </div>
    )
}

export default PokemonTable