import { useState } from 'react'
import { Search, X } from 'lucide-react'

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

const typeLabels = {
    fire: 'Fuego', water: 'Agua', grass: 'Planta',
    electric: 'Eléctrico', psychic: 'Psíquico', ice: 'Hielo',
    dragon: 'Dragón', dark: 'Siniestro', fairy: 'Hada',
    normal: 'Normal', fighting: 'Lucha', flying: 'Volador',
    poison: 'Veneno', ground: 'Tierra', rock: 'Roca',
    bug: 'Bicho', ghost: 'Fantasma', steel: 'Acero',
    shadow: 'Sombra', unknown: 'Desconocido',
}

const SearchBar = ({ value, onChange, selectedType, onTypeChange, types }) => {
    const [showTypes, setShowTypes] = useState(false)

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setShowTypes(true)}
                    onBlur={() => setTimeout(() => setShowTypes(false), 200)}
                    placeholder="Buscar Pokémon..."
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition text-gray-700 placeholder-gray-400"
                />
                {(value || selectedType) && (
                    <button
                        onClick={() => { onChange(''); onTypeChange(null) }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown de tipos */}
            {showTypes && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg z-50 p-3">
                    <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Filtrar por tipo</p>
                    <div className="flex flex-wrap gap-2">
                        {(types || [])
                            .filter(t => !['shadow', 'unknown', 'stellar'].includes(t.name))
                            .map(t => (
                                <button
                                    key={t.name}
                                    onMouseDown={() => onTypeChange(selectedType === t.name ? null : t.name)}
                                    className={`text-xs px-2 py-1 rounded-full font-medium capitalize transition border
                    ${selectedType === t.name
                                            ? 'ring-2 ring-offset-1 ring-red-400 ' + (typeColors[t.name] || 'bg-gray-100 text-gray-500')
                                            : typeColors[t.name] || 'bg-gray-100 text-gray-500'
                                        } border-transparent`}
                                >
                                    {typeLabels[t.name] || t.name}
                                </button>
                            ))}
                    </div>
                </div>
            )}

            {/* Tipo seleccionado */}
            {selectedType && (
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Filtrando por:</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${typeColors[selectedType] || 'bg-gray-100 text-gray-500'}`}>
                        {typeLabels[selectedType] || selectedType}
                    </span>
                </div>
            )}
        </div>
    )
}

export default SearchBar