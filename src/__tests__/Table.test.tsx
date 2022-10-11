import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "components/Table";
import { MemoryRouter } from "react-router-dom";
import { FilterE } from "common/enums";

const tableColumns = [
  { accessor: "name", label: "Name" },
  {
    accessor: "email",
    label: "Email",
  },
  {
    accessor: "status",
    label: "Status",
  },
];

const tableRows = [
  { id: "1", name: "John Smith", email: "test@test.com", status: "accepted" },
  { id: "2", name: "David BecK", email: "test2@test.com", status: "rejected" },
  { id: "2", name: "Jane Nath", email: "test3@test.com", status: "waiting" },
];

const TableFilterControls = [
  {
    accessor: "name",
    label: "Search by Name",
    type: FilterE.Search,
  },
  {
    accessor: "email",
    label: "Email",
    type: FilterE.Search,
  },
  {
    accessor: "status",
    label: "Status",
    type: FilterE.MultiSelect,
  },
];

test("Table headings are rendered with the columns passed in", () => {
  render(
    <MemoryRouter>
      <Table rows={tableRows} columns={tableColumns} paginate />
    </MemoryRouter>,
  );

  const columns = screen
    .getAllByRole("columnheader")
    .map((cell) => cell.textContent);
  expect(columns).toStrictEqual(["Name", "Email", "Status"]);
});

test("Table cells are rendered with the data passed in", () => {
  render(
    <MemoryRouter>
      <Table rows={tableRows} columns={tableColumns} paginate />
    </MemoryRouter>,
  );
  const cells = screen.getAllByRole("cell").map((cell) => cell.textContent);
  expect(cells).toStrictEqual([
    "John Smith",
    "test@test.com",
    "accepted",
    "David BecK",
    "test2@test.com",
    "rejected",
    "Jane Nath",
    "test3@test.com",
    "waiting",
  ]);
});

test("Table Filters are rendered with controls passed in", async () => {
  render(
    <MemoryRouter>
      <Table
        rows={tableRows}
        columns={tableColumns}
        filterControls={TableFilterControls}
        paginate
      />
    </MemoryRouter>,
  );
  const searchText = screen.getByPlaceholderText(/Search by Name/i);
  expect(searchText).toBeInTheDocument();

  const myCustomSelect = await screen.findByLabelText(/Status/i);
  expect(myCustomSelect).toBeInTheDocument();
});

test("Table search filter is applied on data when searching", async () => {
  render(
    <MemoryRouter>
      <Table
        rows={tableRows}
        columns={tableColumns}
        filterControls={TableFilterControls}
        paginate
      />
    </MemoryRouter>,
  );
  const searchBox = screen.getByPlaceholderText(/Search by Name/i);
  searchBox.focus();
  userEvent.keyboard("john");

  const searchQuery = await screen.findByText(/John Smith/i);
  expect(searchQuery).toBeInTheDocument();
});
