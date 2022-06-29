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

const sortingOrders = ["asc", "desc"] as const;
type sortingOrderTuple = typeof sortingOrders;
export type SortingOrder = sortingOrderTuple[number];

export function isSortingOrder(value: string): value is SortingOrder {
  return sortingOrders.includes(value as SortingOrder);
}

export type InvoiceSortingParams = {
  field?: InvoiceSortingField;
  order?: SortingOrder;
};
