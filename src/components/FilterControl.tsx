interface FilterControlsProps {
  sort: string;
  perPage: number;
  loading: boolean;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterControls({
  sort,
  perPage,
  loading,
  onSortChange,
  onPerPageChange,
}: FilterControlsProps) {
  return (
    <div className="flex gap-4">
      <div>
        <label className="mr-2 text-sm font-medium">Sort by:</label>
        <select
          className="border rounded-full px-5 py-1 text-sm"
          value={sort}
          onChange={onSortChange}
          disabled={loading}
        >
          <option value="-published_at">Newest</option>
          <option value="published_at">Oldest</option>
        </select>
      </div>

      <div>
        <label className="mr-2 text-sm font-medium">Show per page:</label>
        <select
          className="border rounded-full px-5 py-1 text-sm"
          value={perPage}
          onChange={onPerPageChange}
          disabled={loading}
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
