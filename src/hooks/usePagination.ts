import { useState } from "react";
import { ITEMS_PER_PAGE } from "common/constants";
import { paginator } from "common/methods";

export function usePagination<T>(dataToPaginate: Array<T>) {
  const [page, setPage] = useState(1);

  function paginateData(page: number, items: Array<T>) {
    const paginate = paginator(items, ITEMS_PER_PAGE);
    return paginate(page);
  }

  const data = paginateData(page, dataToPaginate);
  const pageLength = Math.ceil(dataToPaginate.length / ITEMS_PER_PAGE);
  const pre_page = page - 1 ? page - 1 : null;
  const next_page = pageLength > page ? page + 1 : null;

  return {
    page,
    data,
    pageLength,
    pre_page,
    next_page,
    setPage,
  };
}
