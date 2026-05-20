const Pagination = ({ next, previous, onPageChange, currentPage, totalCount, limit }) => {
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="flex items-center gap-4 justify-center mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!previous}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                ← Anterior
            </button>

            <span className="text-gray-500 text-sm font-medium">
                Página <span className="text-red-500 font-bold">{currentPage}</span> de{' '}
                <span className="text-gray-700 font-bold">{totalPages}</span>
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!next}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Siguiente →
            </button>
        </div>
    )
}

export default Pagination