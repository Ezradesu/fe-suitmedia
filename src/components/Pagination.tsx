interface PaginationProps {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  loading,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {currentPage > 1 && (
        <button
          className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={loading}
        >
          ‹
        </button>
      )}

      {getVisiblePages()[0] > 1 && (
        <>
          <button
            className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => onPageChange(1)}
            disabled={loading}
          >
            1
          </button>
          {getVisiblePages()[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {getVisiblePages().map((num) => (
        <button
          key={num}
          className={`px-3 py-1 text-sm rounded disabled:opacity-50 ${
            num === currentPage
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(num)}
          disabled={loading}
        >
          {num}
        </button>
      ))}

      {/* Last page & dots */}
      {getVisiblePages().slice(-1)[0] < totalPages && (
        <>
          {getVisiblePages().slice(-1)[0] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => onPageChange(totalPages)}
            disabled={loading}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <button
          className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={loading}
        >
          ›
        </button>
      )}
    </div>
  );
}
