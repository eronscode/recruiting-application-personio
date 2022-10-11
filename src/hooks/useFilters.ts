import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createFilterOptions } from "common/methods";
import { FilterT, SelectOptionT } from "common/types";
import { FilterE } from "common/enums";

export function useFilters<T>(
  filters: Array<FilterT>,
  dataToFilter: Array<T>,
  { onFilter }: { onFilter?: () => void },
) {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: SelectOptionT[] | string;
  } | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = filters.map((filter) => {
    if (filter.type === FilterE.MultiSelect) {
      return createFilterOptions(dataToFilter, filter.accessor);
    }
    return [];
  });

  function updateFilters(selected: any, accessor: string) {
    onFilter && onFilter();
    if (selected && selected.length > 0) {
      setSelectedFilters((prevState: any) => ({
        ...prevState,
        [accessor]: selected,
      }));
      setSearchParams({
        ...Object.fromEntries(Array.from(searchParams)),
        [accessor]: Array.isArray(selected)
          ? selected.map((select: any) => select.value).join(",")
          : selected,
      });
    } else {
      setSelectedFilters((prevState: any) => {
        const updatedFilters = { ...prevState };
        delete updatedFilters[accessor];
        return updatedFilters;
      });
      const updatedURLFilters = {
        ...Object.fromEntries(Array.from(searchParams)),
      };
      delete updatedURLFilters[accessor];
      setSearchParams(updatedURLFilters);
    }
  }

  function resetFilters() {
    setSelectedFilters(null);
  }

  const data = useMemo(() => {
    return dataToFilter.filter((obj) =>
      Object.entries(selectedFilters || {}).every(([prop, find]) => {
        const objProp = obj[prop as keyof typeof obj] as string;
        if (Array.isArray(find)) {
          return find.some((item) => item.value.toString().includes(objProp));
        }
        return objProp.toLowerCase().indexOf(find.toLowerCase()) !== -1;
      }),
    );
  }, [selectedFilters, dataToFilter]);


  console.log({ data, selectedFilters });

  return {
    data,
    filters,
    updateFilters,
    selectedFilters,
    options,
    resetFilters,
  };
}
