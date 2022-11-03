import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sortRows } from "common/methods";

export function useSorting<T>(
  dataToSort: Array<T>,
  { onSort }: { onSort?: () => void },
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderFromURL = searchParams.get("order");
  const orderByFromURL = searchParams.get("orderBy");
  const [sort, setSort] = useState({ order: orderFromURL || "asc", orderBy: orderByFromURL || "id" });

  const handleSort = (accessor: string) => {
    onSort && onSort();
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
    setSearchParams({
      ...Object.fromEntries(Array.from(searchParams)),
      order: sort.order === "asc" && sort.orderBy === accessor ? "desc" : "asc",
      orderBy: accessor,
    });
  };

  const data = useMemo(() => sortRows(dataToSort, sort), [dataToSort, sort]);

  return {
    data,
    sort,
    handleSort,
  };
}
