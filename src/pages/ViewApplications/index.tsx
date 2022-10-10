import MainLayout from "layouts/MainLayout";
import { API_URL } from "common/constants";
import Table from "components/Table";
import { useFetch } from "hooks/useFetch";
import { UserT } from "common/types";
import styles from "./ViewApplications.module.css";
import classNames from "classnames";

const columns = [
  { accessor: "name", label: "Name" },
  {
    accessor: "email",
    label: "Email",
    format: (value: any) => <a href={`mailto:${value}`}>{value}</a>,
  },
  { accessor: "birth_date", label: "Birth Date" },
  {
    accessor: "year_of_experience",
    label: "Years Of Experience",
    sortable: true,
  },
  { accessor: "position_applied", label: "Position Applied", sortable: true },
  { accessor: "application_date", label: "Application Date", sortable: true },
  {
    accessor: "status",
    label: "Status",
    format: (value: any) => (
      <span className={classNames(styles.label, styles[value])}>{value}</span>
    ),
  },
];

function Applications() {
  const { data, isLoading, error } = useFetch<UserT[]>(API_URL);

  return (
    <MainLayout>
      <section className={styles.wrapper}>
        <h1>Applications</h1>
        {error ? (
          <p>Error Occured</p>
        ) : (
          <Table
            rows={data || []}
            columns={columns}
            paginate
            isLoading={isLoading}
          />
        )}
      </section>
    </MainLayout>
  );
}

export default Applications;
