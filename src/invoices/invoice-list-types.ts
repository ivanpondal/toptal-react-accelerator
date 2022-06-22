const invoiceSortingFields = [
  "total",
  "dueDate",
  "creationDate",
  "companyName",
] as const;
type InvoiceSortingFieldTuple = typeof invoiceSortingFields;
export type InvoiceSortingField = InvoiceSortingFieldTuple[number];

export function isInvoiceSortingField(
  value: string
): value is InvoiceSortingField {
  return invoiceSortingFields.includes(value as InvoiceSortingField);
}

const invoiceSortingOrders = ["asc", "desc"] as const;
type InvoiceSortingOrderTuple = typeof invoiceSortingOrders;
export type InvoiceSortingOrder = InvoiceSortingOrderTuple[number];

export function isInvoiceSortingOrder(
  value: string
): value is InvoiceSortingOrder {
  return invoiceSortingOrders.includes(value as InvoiceSortingOrder);
}

export type InvoiceSortingParams = {
  field?: InvoiceSortingField;
  order?: "asc" | "desc";
};
