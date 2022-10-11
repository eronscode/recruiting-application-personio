import { FilterE } from "./enums";

export type UserT = {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  year_of_experience: string;
  position_applied: string;
  application_date: string;
  status: string;
};

export type SelectOptionT = {
  value: string | number;
  label: string;
};

export type FilterT = {
    accessor: string;
    type: FilterE;
    label: string;
  };
  