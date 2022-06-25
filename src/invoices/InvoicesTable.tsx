import {
  GridRowId,
  DataGrid,
  GridColDef,
  GridSortModel,
  getGridStringOperators,
  GridFilterModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { ContextMenu } from "../components/ContextMenu";
import {
  DataTestLoadingOverlay,
  DataTestRow,
  DataTestCell,
  DataTestNoRowsOverlay,
  AutocompleteFilter,
  CustomToolbar,
  CustomPagination,
  DataGridHeader,
} from "../components/custom-grid";

const columns: (
  sortable: boolean,
  filtering: boolean,
  filterClientNames: { id: string; label: string }[]
) => GridColDef[] = (sortable, filtering, filterClientNames) => [
  {
    field: "number",
    headerName: "Invoice number",
    flex: 1.75,
    sortable: false,
    filterable: false,
  },
  {
    field: "companyName",
    headerName: "Company name",
    flex: 1.75,
    sortable: sortable,
    filterable: filtering,
    filterOperators: getGridStringOperators()
      .filter((operator) => operator.value === "equals")
      .map((operator) => ({
        ...operator,
        InputComponent: AutocompleteFilter,
        InputComponentProps: { options: filterClientNames },
      })),
    renderHeader: (params) => (
      <DataGridHeader {...params} dataTestId="company-name-header" />
    ),
  },
  {
    field: "creationDate",
    headerName: "Date",
    flex: 1.25,
    sortable: sortable,
    filterable: false,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    renderHeader: (params) => (
      <DataGridHeader {...params} dataTestId="creation-date-header" />
    ),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    flex: 1.25,
    sortable: sortable,
    filterable: false,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    renderHeader: (params) => (
      <DataGridHeader {...params} dataTestId="due-date-header" />
    ),
  },
  {
    field: "project",
    headerName: "Project",
    flex: 1,
    sortable: false,
    filterable: false,
  },
  {
    field: "total",
    headerName: "Price",
    sortable: sortable,
    filterable: false,
    flex: 1,
    type: "number",
    renderHeader: (params) => (
      <DataGridHeader {...params} dataTestId="total-header" />
    ),
  },
  {
    field: "actions",
    headerName: "",
    type: "actions",
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <ContextMenu
        dataTestId="invoice-actions"
        menuItems={[
          {
            href: `/invoices/${params.id}/view?print=true`,
            item: "Print invoice",
            dataTestId: "invoice-print",
          },
          { href: `/invoices/${params.id}/edit`, item: "Edit invoice" },
        ]}
      />
    ),
  },
];

export type TableInvoice = {
  id: string;
  number: string;
  companyName: string;
  creationDate: number;
  dueDate: number;
  project?: string;
  total: number;
};

export type GridSortingProps = {
  sortable?: boolean;
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
};

export type GridPaginationProps = {
  pagination?: true;
  page?: number;
  totalRowCount?: number;
  onPageChange?: (pageNumber: number) => void;
};

export type GridFilteringProps = {
  filtering?: true;
  onFilterChange?: (model: GridFilterModel) => void;
  filterClientNames?: { id: string; label: string }[];
  selectedClientName?: string;
};

const PAGE_SIZE = 10;

export const InvoicesTable = (
  props: {
    invoices: Array<TableInvoice>;
    loading: boolean;
    onRowClick: (rowId: GridRowId) => unknown;
  } & GridSortingProps &
    GridPaginationProps &
    GridFilteringProps
) => {
  const {
    invoices,
    loading,
    onRowClick,
    sortModel,
    onSortModelChange,
    sortable = false,
    pagination,
    totalRowCount,
    onPageChange,
    page,
    filtering = false,
    onFilterChange,
    filterClientNames = [],
    selectedClientName,
  } = props;

  const [filterButtonEl, setFilterButtonEl] =
    useState<HTMLButtonElement | null>(null);

  return (
    <div data-test="invoices-table">
      <DataGrid
        columns={columns(sortable, filtering, filterClientNames)}
        rows={invoices}
        hideFooter={!pagination}
        disableColumnMenu
        autoHeight
        loading={loading}
        onRowClick={(params) => onRowClick(params.id)}
        components={{
          LoadingOverlay: DataTestLoadingOverlay,
          Row: DataTestRow("invoice"),
          Cell: DataTestCell("invoice"),
          NoRowsOverlay: DataTestNoRowsOverlay,
          NoResultsOverlay: DataTestNoRowsOverlay,
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        sortingMode="server"
        columnVisibilityModel={{ dueDate: sortable }}
        pagination={pagination}
        paginationMode={pagination ? "server" : "client"}
        rowCount={totalRowCount}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        onPageChange={onPageChange}
        page={page ? page - 1 : undefined}
        filterMode={"server"}
        filterModel={
          filtering && selectedClientName
            ? {
                items: [
                  {
                    columnField: "companyName",
                    value: selectedClientName,
                    operatorValue: "equals",
                  },
                ],
              }
            : { items: [] }
        }
        onFilterModelChange={onFilterChange}
      />
    </div>
  );
};
