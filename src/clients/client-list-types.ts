import { SortingOrder } from "../invoices/invoice-list-types";

const clientSortingFields = [
  "clientName",
  "companyName",
  "invoicesCount",
  "totalBilled",
] as const;

type ClientSortingFieldTuple = typeof clientSortingFields;
export type ClientSortingField = ClientSortingFieldTuple[number];

export function isClientSortingField(
  value: string
): value is ClientSortingField {
  return clientSortingFields.includes(value as ClientSortingField);
}

export type ClientSortingParams = {
  field?: ClientSortingField;
  order?: SortingOrder;
};
