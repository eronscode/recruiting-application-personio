import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sortRows } from "common/methods";

export function useSorting<T>(
  dataToSort: Array<T>,
  { onSort }: { onSort?: () => void },
) {
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  const [searchParams, setSearchParams] = useSearchParams();
  const orderFromURL = searchParams.get("order");
  const orderByFromURL = searchParams.get("orderBy");

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

  useEffect(() => {
    if (orderFromURL && orderByFromURL) {
      setSort({
        order: orderFromURL,
        orderBy: orderByFromURL,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => sortRows(dataToSort, sort), [dataToSort, sort]);

  return {
    data,
    sort,
    handleSort,
  };
}
