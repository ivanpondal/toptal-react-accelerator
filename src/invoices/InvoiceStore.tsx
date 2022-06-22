import produce from "immer";
import create from "zustand";
import { InvoiceAPI, InvoiceListingSorting } from "../api/base";
import { InvoiceSortingParams } from "./InvoiceListContainer";
import { TableInvoice } from "./InvoicesTable";

type InvoiceStore = {
  invoiceList: {
    invoices: Array<TableInvoice>;
    fetchStatus: "error" | "idle" | "pending" | "success";
    errorMessage: string | null;
  };
  fetchInvoiceList: (params: FetchInvoiceParams) => unknown;
};

type FetchInvoiceParams = {
  sort: InvoiceSortingParams;
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoiceList: { invoices: [], fetchStatus: "idle", errorMessage: null },
  fetchInvoiceList: async (params) => {
    const { sort } = params;
    set(
      produce((draft: InvoiceStore) => {
        draft.invoiceList.invoices = [];
        draft.invoiceList.errorMessage = null;
        draft.invoiceList.fetchStatus = "pending";
      })
    );

    let apiSortModel;
    if (sort && sort.field) {
      let apiSortField: keyof InvoiceListingSorting;
      switch (sort.field) {
        case "creationDate":
          apiSortField = "date";
          break;
        case "total":
          apiSortField = "price";
          break;
        default:
          apiSortField = sort.field;
      }

      apiSortModel = {
        [apiSortField]: sort.order,
      };
    }

    try {
      const response = await InvoiceAPI.getAll({ sort: apiSortModel })
        .then((res) => res.invoices)
        .then((res) =>
          res.map((invoiceWithDetails) => {
            return {
              id: invoiceWithDetails.invoice.id,
              number: invoiceWithDetails.invoice.invoice_number,
              companyName: invoiceWithDetails.client.companyDetails.name,
              creationDate: invoiceWithDetails.invoice.date,
              dueDate: invoiceWithDetails.invoice.dueDate,
              project: invoiceWithDetails.invoice.projectCode,
              total: invoiceWithDetails.invoice.value,
            };
          })
        );

      set(
        produce((draft: InvoiceStore) => {
          draft.invoiceList.invoices = response;
          draft.invoiceList.fetchStatus = "success";
        })
      );
    } catch (error: any) {
      set(
        produce((draft: InvoiceStore) => {
          draft.invoiceList.invoices = [];
          draft.invoiceList.fetchStatus = "error";
          draft.invoiceList.errorMessage =
            "Oops! Something went wrong with the server";
        })
      );
    }
  },
}));
