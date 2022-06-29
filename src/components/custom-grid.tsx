import { Autocomplete, PaginationItem, TextField } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import {
  GridLoadingOverlay,
  GridRowProps,
  GridRow,
  GridCellProps,
  GridCell,
  GridNoRowsOverlay,
  GridFilterInputValueProps,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridColumnHeaderParams,
  GridColumnHeaderTitle,
} from "@mui/x-data-grid";
import React from "react";

export const DataTestLoadingOverlay = () => (
  <GridLoadingOverlay data-test="loading-overlay" />
);

export const DataTestRow = (id: string) =>
  React.memo(function DataTestRow(
    props: React.HTMLAttributes<HTMLDivElement> & GridRowProps
  ) {
    return <GridRow data-test={`${id}-row-${props.rowId}`} {...props} />;
  });

export const DataTestCell = (id: string) =>
  React.memo(function DataTestCell(props: GridCellProps<any, any>) {
    return <GridCell data-test={`${id}-${props.field}`} {...props} />;
  });

export const DataTestNoRowsOverlay = () => (
  <GridNoRowsOverlay data-test="empty-placeholder" />
);

export const AutocompleteFilter = (
  props: GridFilterInputValueProps & Record<string, any>
) => {
  const { item, options, applyValue } = props;
  return (
    <Autocomplete
      sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
      options={options}
      onChange={(_, data) =>
        applyValue({ ...item, value: data ? data.label : null })
      }
      value={item.value ? item.value : null}
      isOptionEqualToValue={(option, value) =>
        value ? option.label === value : false
      }
      renderInput={(params) => {
        return <TextField margin="normal" sx={{ m: 0 }} {...params} />;
      }}
    />
  );
};

export const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const { items } = usePagination({
    count: pageCount,
    page: page + 1,
    onChange: (_, value) => apiRef.current.setPage(value - 1),
  });

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        {items.map(({ ...item }, index) => {
          let dataTestId;
          if (item.type === "page") {
            dataTestId = `page-${index}`;
          }
          return (
            <li key={index}>
              <PaginationItem data-test={dataTestId} {...item} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DataGridHeader(
  props: GridColumnHeaderParams<any, any, any> & { dataTestId: string }
) {
  return (
    <div data-test={props.dataTestId}>
      <GridColumnHeaderTitle
        label={props.colDef.headerName ? props.colDef.headerName : props.field}
        columnWidth={props.colDef.computedWidth}
      />
    </div>
  );
}

export type GridPaginationProps = {
  pagination?: true;
  page?: number;
  totalRowCount?: number;
  onPageChange?: (pageNumber: number) => void;
};

export const PAGE_SIZE = 10;
