import { X, Zap } from 'lucide-react'
import { useAbilityDetail } from '../hooks/usePokemon'

const AbilityModal = ({ name, onClose }) => {
    const { data, isLoading } = useAbilityDetail(name)

    const effectEs = data?.effect_entries?.find(e => e.language.name === 'es')
    const effectEn = data?.effect_entries?.find(e => e.language.name === 'en')
    const effect = effectEs || effectEn

    const nameEs = data?.names?.find(n => n.language.name === 'es')?.name || name

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-10 animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-gray-800 capitalize mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    {nameEs}
                </h3>

                {isLoading ? (
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Efecto corto</p>
                            <p className="text-gray-600 text-sm">{effect?.short_effect || 'Sin descripción'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Efecto completo</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{effect?.effect || 'Sin descripción'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AbilityModal