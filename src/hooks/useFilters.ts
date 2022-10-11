import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  createFilterOptions,
  generateOptionsFromStringArr,
} from "common/methods";
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
  const allQueryParamsFromURL = Object.fromEntries(Array.from(searchParams));

  const options = filters.map((filter) => {
    if (filter.type === FilterE.MultiSelect) {
      return createFilterOptions(dataToFilter, filter.accessor);
    }
    return [];
  });

  /*
    # --------------------------------------------------------------- #
    # updates SelectedFilters and searchParams with data gotten from  #
    # filter types e.g MultiSelect:SelectOptionT[] or Input:string    #
    # --------------------------------------------------------------- #
  */
  function updateFilters(selected: SelectOptionT[] | string, accessor: string) {
    onFilter && onFilter();
    if (selected && selected.length > 0) {
      setSelectedFilters((prevState: any) => ({
        ...prevState,
        [accessor]: selected,
      }));
      setSearchParams({
        ...allQueryParamsFromURL,
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
        ...allQueryParamsFromURL,
      };
      delete updatedURLFilters[accessor];
      setSearchParams(updatedURLFilters);
    }
  }

  function resetFilters() {
    const updatedURLFilters = {
      ...allQueryParamsFromURL,
    };
    Object.keys(updatedURLFilters).forEach((key) => {
      delete updatedURLFilters[key];
    });

    setSelectedFilters(null);
    setSearchParams(updatedURLFilters);
  }

  /*
    # ------------------------------------------------------------ #
    # Compares accessor keys in Filters prop with keys gotten from #
    # url and sets selected filters on component mount             #
    # ------------------------------------------------------------ #
  */
  useEffect(() => {
    let keyFound: { [key: string]: string | SelectOptionT[] } = {};
    Object.keys(allQueryParamsFromURL).forEach((key) => {
      const keyExist = filters.some((filter) => filter.accessor.includes(key));
      if (keyExist) {
        const filterType = filters.find((item) => item.accessor === key);
        keyFound[key] =
          filterType?.type === FilterE.MultiSelect
            ? generateOptionsFromStringArr(
                allQueryParamsFromURL[key].split(","),
              )
            : allQueryParamsFromURL[key];
      }
    });
    if (Object.keys(keyFound).length > 0) {
      setSelectedFilters(keyFound);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    # ---------------------------------------- #
    # Performs search based on selectedFilters #            
    # ---------------------------------------- #
  */
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

  return {
    data,
    filters,
    updateFilters,
    selectedFilters,
    options,
    resetFilters,
  };
}
