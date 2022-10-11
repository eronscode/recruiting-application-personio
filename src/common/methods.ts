export function paginator<T>(arr: Array<T>, perPage: number) {
  if (perPage < 1 || !arr) return () => [];

  return function (page: number) {
    const basePage = (page - 1) * perPage;

    return page < 0 || basePage >= arr.length
      ? []
      : arr.slice(basePage, basePage + perPage);
  };
}

export function isNil(value: undefined | null) {
  return typeof value === "undefined" || value === null;
}

export function isNumber(value: number) {
  return typeof value == "number" && !isNaN(value);
}

export function isBoolean(value: Boolean) {
  return value === true || value === false;
}

export function convertType(value: number | string | boolean) {
  if (isNumber(value as number)) {
    return value.toString();
  }

  if (isDateString(value)) {
    return convertDateString(value);
  }

  if (isBoolean(value as boolean)) {
    return value ? "1" : "-1";
  }

  return value;
}

export function isDateString(value: any) {
  if (!isString(value)) return false;

  return value.match(/^\d{2}-\d{2}-\d{4}$/);
}

export function isString(value: any) {
  return typeof value === "string" || value instanceof String;
}

export function convertDateString(value: any) {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2);
}

export function sortRows<T>(
  rows: Array<T>,
  sort: { order: string; orderBy: string },
) {
  return [...rows].sort((a, b) => {
    const { order, orderBy } = sort;

    const first = a[orderBy as keyof typeof a];
    const second = b[orderBy as keyof typeof b];

    if (isNil(first as undefined)) return 1;
    if (isNil(second as undefined)) return -1;

    const aLocale = convertType(first as number | string | boolean);
    const bLocale = convertType(second as number | string | boolean);

    if (order === "asc") {
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(second as number),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(first as number),
      });
    }
  });
}

export function createFilterOptions<T>(array: T[], key: string) {
  let values: any[] = [];
  [...array].forEach((element) => {
    const checkValues = values.filter(
      (item) => item.value === element[key as keyof typeof element],
    );
    if (checkValues.length === 0) {
      values.push({
        value: element[key as keyof typeof element],
        label: element[key as keyof typeof element],
      });
    }
  });

  return values;
}
