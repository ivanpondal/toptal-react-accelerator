import produce from "immer";
import create from "zustand";
import { InvoiceAPI } from "../api/base";
import { TableInvoice } from "./InvoicesTable";

type InvoiceStore = {
  invoiceList: {
    invoices: Array<TableInvoice>;
    fetchStatus: "error" | "idle" | "pending" | "success";
    errorMessage: string | null;
  };
  fetchInvoiceList: (params: any) => unknown;
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoiceList: { invoices: [], fetchStatus: "idle", errorMessage: null },
  fetchInvoiceList: async (params) => {
    set(
      produce((draft: InvoiceStore) => {
        draft.invoiceList.invoices = [];
        draft.invoiceList.errorMessage = null;
        draft.invoiceList.fetchStatus = "pending";
      })
    );

    try {
      const response = await InvoiceAPI.getAll({})
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
