import { useState, useEffect } from 'react'
import { X, Volume2 } from 'lucide-react'
import { usePokemonDetail, usePokemonSpecies } from '../hooks/usePokemon'
import AbilityModal from './AbilityModal'

const typeColors = {
    fire: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', hex: '#f97316' },
    water: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', hex: '#3b82f6' },
    grass: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', hex: '#22c55e' },
    electric: { bg: 'bg-yellow-400', light: 'bg-yellow-100', text: 'text-yellow-600', hex: '#facc15' },
    psychic: { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-600', hex: '#ec4899' },
    ice: { bg: 'bg-cyan-400', light: 'bg-cyan-100', text: 'text-cyan-600', hex: '#22d3ee' },
    dragon: { bg: 'bg-indigo-600', light: 'bg-indigo-100', text: 'text-indigo-600', hex: '#4f46e5' },
    dark: { bg: 'bg-gray-700', light: 'bg-gray-200', text: 'text-gray-700', hex: '#374151' },
    fairy: { bg: 'bg-rose-400', light: 'bg-rose-100', text: 'text-rose-500', hex: '#fb7185' },
    normal: { bg: 'bg-gray-400', light: 'bg-gray-100', text: 'text-gray-500', hex: '#9ca3af' },
    fighting: { bg: 'bg-red-600', light: 'bg-red-100', text: 'text-red-600', hex: '#dc2626' },
    flying: { bg: 'bg-sky-400', light: 'bg-sky-100', text: 'text-sky-500', hex: '#38bdf8' },
    poison: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', hex: '#a855f7' },
    ground: { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-600', hex: '#f59e0b' },
    rock: { bg: 'bg-stone-500', light: 'bg-stone-100', text: 'text-stone-600', hex: '#78716c' },
    bug: { bg: 'bg-lime-500', light: 'bg-lime-100', text: 'text-lime-600', hex: '#84cc16' },
    ghost: { bg: 'bg-violet-600', light: 'bg-violet-100', text: 'text-violet-600', hex: '#7c3aed' },
    steel: { bg: 'bg-slate-500', light: 'bg-slate-100', text: 'text-slate-600', hex: '#64748b' },
}

const typeLabels = {
    fire: 'Fuego', water: 'Agua', grass: 'Planta',
    electric: 'Eléctrico', psychic: 'Psíquico', ice: 'Hielo',
    dragon: 'Dragón', dark: 'Siniestro', fairy: 'Hada',
    normal: 'Normal', fighting: 'Lucha', flying: 'Volador',
    poison: 'Veneno', ground: 'Tierra', rock: 'Roca',
    bug: 'Bicho', ghost: 'Fantasma', steel: 'Acero',
}

const statLabels = {
    hp: 'HP', attack: 'Ataque', defense: 'Defensa',
    'special-attack': 'Atq. Esp.', 'special-defense': 'Def. Esp.', speed: 'Velocidad',
}

const statColors = {
    hp: 'bg-red-400', attack: 'bg-orange-400', defense: 'bg-yellow-400',
    'special-attack': 'bg-blue-400', 'special-defense': 'bg-green-400', speed: 'bg-pink-400',
}

const PokemonModal = ({ name, onClose }) => {
    const { data, isLoading } = usePokemonDetail(name)
    const { data: species } = usePokemonSpecies(name)
    const [selectedAbility, setSelectedAbility] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 10)
    }, [])

    const handleClose = () => {
        setVisible(false)
        setTimeout(onClose, 300)
    }

    const image =
        data?.sprites?.other?.['official-artwork']?.front_default ||
        data?.sprites?.front_default

    const types = data?.types?.map((t) => t.type.name) || []
    const abilities = data?.abilities?.map((a) => a.ability.name) || []
    const stats = data?.stats || []
    const cry = data?.cries?.latest

    const nameEs = species?.names?.find(n => n.language.name === 'es')?.name || name

    const type1 = types[0]
    const type2 = types[1]
    const color1 = typeColors[type1]?.hex || '#ef4444'
    const color2 = typeColors[type2]?.hex || color1

    const headerStyle = type2
        ? { background: `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)` }
        : { backgroundColor: color1 }

    const playCry = () => {
        if (cry) {
            const audio = new Audio(cry)
            audio.play()
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
                <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleClose}
                />
                <div
                    className={`relative bg-white rounded-2xl shadow-xl w-full max-w-sm z-10 overflow-hidden transition-all duration-300 ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
                >
                    {/* Header con colores por tipo */}
                    <div className="px-6 pt-6 pb-16 text-center relative" style={headerStyle}>
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {cry && (
                            <button
                                onClick={playCry}
                                className="absolute top-4 left-4 text-white/70 hover:text-white transition"
                                title="Escuchar grito"
                            >
                                <Volume2 className="w-5 h-5" />
                            </button>
                        )}
                        <p className="text-white/70 text-sm font-mono">
                            #{String(data?.id || 0).padStart(3, '0')}
                        </p>
                        <h3 className="text-white text-2xl font-bold capitalize">{nameEs}</h3>
                    </div>

                    {/* Imagen flotante */}
                    <div className="flex justify-center -mt-14 relative z-10">
                        {isLoading ? (
                            <div className="w-28 h-28 rounded-full bg-gray-100 animate-pulse" />
                        ) : (
                            <img
                                src={image}
                                alt={name}
                                className="w-28 h-28 object-contain drop-shadow-lg"
                            />
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="px-6 pb-6 pt-2 space-y-4 max-h-96 overflow-y-auto">

                        {/* Tipos */}
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Tipo</p>
                            <div className="flex gap-2 flex-wrap">
                                {types.map((type) => (
                                    <span
                                        key={type}
                                        className={`text-sm px-3 py-1 rounded-full font-medium capitalize ${typeColors[type]?.light || 'bg-gray-100'} ${typeColors[type]?.text || 'text-gray-500'}`}
                                    >
                                        {typeLabels[type] || type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Peso */}
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Peso</p>
                            <p className="text-gray-700 font-medium">
                                {data?.weight ? `${(data.weight / 10).toFixed(1)} kg` : '—'}
                            </p>
                        </div>

                        {/* Habilidades */}
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                                Habilidades <span className="normal-case text-gray-300">(clic para ver efectos)</span>
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {abilities.map((ability) => (
                                    <button
                                        key={ability}
                                        onClick={() => setSelectedAbility(ability)}
                                        className="text-sm px-3 py-1 rounded-full capitalize border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition font-medium"
                                    >
                                        {ability}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Estadísticas</p>
                            <div className="space-y-2">
                                {stats.map((s) => (
                                    <div key={s.stat.name} className="flex items-center gap-3">
                                        <span className="text-xs text-gray-500 w-20 shrink-0">
                                            {statLabels[s.stat.name] || s.stat.name}
                                        </span>
                                        <span className="text-xs font-bold text-gray-700 w-8 text-right shrink-0">
                                            {s.base_stat}
                                        </span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-700 ${statColors[s.stat.name] || 'bg-gray-400'}`}
                                                style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {selectedAbility && (
                <AbilityModal
                    name={selectedAbility}
                    onClose={() => setSelectedAbility(null)}
                />
            )}
        </>
    )
}

export default PokemonModal