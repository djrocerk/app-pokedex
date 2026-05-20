import { useRef } from 'react'
import { usePokemonDetail } from '../hooks/usePokemon'

const typeColors = {
    fire: 'bg-orange-100 text-orange-600',
    water: 'bg-blue-100 text-blue-600',
    grass: 'bg-green-100 text-green-600',
    electric: 'bg-yellow-100 text-yellow-600',
    psychic: 'bg-pink-100 text-pink-600',
    ice: 'bg-cyan-100 text-cyan-600',
    dragon: 'bg-indigo-100 text-indigo-600',
    dark: 'bg-gray-200 text-gray-700',
    fairy: 'bg-rose-100 text-rose-500',
    normal: 'bg-gray-100 text-gray-500',
    fighting: 'bg-red-100 text-red-600',
    flying: 'bg-sky-100 text-sky-500',
    poison: 'bg-purple-100 text-purple-600',
    ground: 'bg-amber-100 text-amber-600',
    rock: 'bg-stone-100 text-stone-600',
    bug: 'bg-lime-100 text-lime-600',
    ghost: 'bg-violet-100 text-violet-600',
    steel: 'bg-slate-100 text-slate-600',
}

const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
        <td className="py-3 px-4">
            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="py-3 px-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
        </td>
        <td className="py-3 px-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="py-3 px-4">
            <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </td>
    </tr>
)

const PokemonRow = ({ name, onDoubleClick }) => {
    const { data, isLoading } = usePokemonDetail(name)
    const lastTap = useRef(null)

    const handleTap = () => {
        const now = Date.now()
        if (lastTap.current && now - lastTap.current < 300) {
            onDoubleClick(name)
            lastTap.current = null
        } else {
            lastTap.current = now
        }
    }

    if (isLoading) return <SkeletonRow />

    const image =
        data?.sprites?.other?.['official-artwork']?.front_default ||
        data?.sprites?.front_default

    const types = data?.types?.map((t) => t.type.name) || []

    return (
        <tr className="border-b border-gray-100 hover:bg-red-50 transition group">
            <td className="py-3 px-4 text-gray-500 text-sm font-mono">
                #{String(data?.id).padStart(3, '0')}
            </td>
            <td className="py-3 px-4">
                <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-contain cursor-pointer transition-transform group-hover:scale-110"
                    onDoubleClick={() => onDoubleClick(name)}
                    onClick={handleTap}
                    title="Doble clic para ver detalles"
                />
            </td>
            <td className="py-3 px-4 capitalize font-medium text-gray-700">
                {name}
            </td>
            <td className="py-3 px-4">
                <div className="flex gap-1 flex-wrap">
                    {types.map((type) => (
                        <span
                            key={type}
                            className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${typeColors[type] || 'bg-gray-100 text-gray-500'}`}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </td>
        </tr>
    )
}

export default PokemonRow