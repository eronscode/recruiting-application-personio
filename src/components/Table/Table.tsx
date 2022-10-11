import { ReactNode } from "react";
import classNames from "classnames";
import Pagination from "components/Pagination";
import { usePagination } from "hooks/usePagination";
import { useSorting } from "hooks/useSorting";
import styles from "./Table.module.css";
import { ArrowDownIcon, ArrowUpIcon } from "components/SvgIcons";
import { FilterT } from "common/types";
import Filter from "components/Filter";
import { useFilters } from "hooks/useFilters";
import TableLoaders from "components/Loaders/TableLoader";

type Props<T> = {
  columns: {
    accessor: string;
    label: string;
    format?: (value: any) => ReactNode;
    sortable?: boolean;
  }[];
  rows: Array<T>;
  paginate?: boolean;
  isLoading?: boolean;
  filterControls?: FilterT[];
};

const Table = <T extends { id?: string }>({
  columns,
  rows,
  paginate,
  isLoading,
  filterControls,
}: Props<T>) => {
  const {
    filters,
    updateFilters,
    selectedFilters,
    options,
    data: filteredData,
    resetFilters,
  } = useFilters(filterControls ?? [], rows, {
    onFilter: () => {
      setPage(1);
    },
  });

  const {
    data: sortedData,
    handleSort,
    sort,
  } = useSorting(filteredData, {
    onSort: () => {
      setPage(1);
    },
  });

  const {
    page,
    data: paginateData,
    pre_page,
    next_page,
    pageLength,
    setPage,
  } = usePagination(sortedData);

  const data = paginate ? paginateData : sortedData;

  if (isLoading) return <TableLoaders />;

  return (
    <>
      <section className={styles.tableWrapper}>
        {filters && (
          <Filter
            filterControls={filters}
            selectedFilters={selectedFilters}
            updateFilters={updateFilters}
            options={options}
            resetFilters={resetFilters}
          />
        )}
        <table>
          <thead>
            <tr>
              {columns?.map((column) => {
                return (
                  <th key={column.accessor}>
                    {column.label}
                    {column.sortable && (
                      <button onClick={() => handleSort(column.accessor)}>
                        <ArrowUpIcon
                          className={classNames({
                            [styles.active]:
                              column.accessor === sort.orderBy &&
                              sort.order === "asc",
                          })}
                        />
                        <ArrowDownIcon
                          className={classNames({
                            [styles.active]:
                              column.accessor === sort.orderBy &&
                              sort.order === "desc",
                          })}
                        />
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((column) => {
                    if (column.format) {
                      return (
                        <td key={column.accessor}>
                          {column.format(
                            row[column.accessor as keyof typeof row],
                          )}
                        </td>
                      );
                    }
                    return (
                      <td key={column.accessor}>
                        {row[column.accessor as keyof typeof row] as string}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {paginate && (
        <section className={styles.paginationWrapper}>
          <Pagination
            length={pageLength}
            prev={pre_page}
            next={next_page}
            currentPage={page}
            click={setPage}
          />
        </section>
      )}
    </>
  );
};

export default Table;
