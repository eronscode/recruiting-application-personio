import { FilterE } from "common/enums";
import { FilterT, SelectOptionT } from "common/types";
import CustomMultiSelect from "components/CustomMultiSelect";
import styles from "./Filter.module.css";
import Input from "components/Input";

type Props = {
  filterControls: FilterT[];
  options?: SelectOptionT[][];
  selectedFilters: {
    [key: string]: SelectOptionT[] | string;
  } | null;
  resetFilters: (value?: any) => void;
  updateFilters: (value: SelectOptionT[] | string, accessor: string) => void;
};

function Filter({
  filterControls,
  selectedFilters,
  options,
  resetFilters,
  updateFilters,
}: Props) {
  return Array.isArray(filterControls) && filterControls?.length > 0 ? (
    <section className={styles.filterWrapper}>
      <h1>Filters: </h1>
      {filterControls?.map((filter, index) => {
        return (
          <div key={filter.accessor}>
            {renderFilterType(
              filter,
              options ? options[index] : [],
              updateFilters,
              selectedFilters,
            )}
          </div>
        );
      })}
      {Object.keys(selectedFilters || {}).length > 0 && (
        <button onClick={resetFilters} className={styles.clearBtn}>
          Clear Filters
        </button>
      )}
    </section>
  ) : null;
}

function renderFilterType(
  filter: FilterT,
  options: Array<SelectOptionT>,
  handleChange: (value: any, accessor: string) => void,
  selectedFilters: any,
) {
  switch (filter.type) {
    case FilterE.MultiSelect:
      return (
        <CustomMultiSelect
          options={options || []}
          onChange={(selected) => handleChange(selected, filter.accessor)}
          placeholder={filter.label}
          values={selectedFilters ? selectedFilters[filter.accessor] : []}
        />
      );
    case FilterE.Search:
      return (
        <Input
          onValueChange={(selected) => handleChange(selected, filter.accessor)}
          placeholder={filter.label}
          value={selectedFilters ? selectedFilters[filter.accessor] : ""}
        />
      );

    default:
      return <p>Invalid Filter Type</p>;
  }
}

export default Filter;
