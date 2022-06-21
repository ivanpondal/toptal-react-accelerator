import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import parseQueryParam from "../src/integration/query-params";
import {
  InvoiceListContainer,
  InvoiceSortingField,
  InvoiceSortingOrder,
  InvoiceSortingParams,
  isInvoiceSortingField,
  isInvoiceSortingOrder,
} from "../src/invoices/InvoiceListContainer";

export default function InvoiceList() {
  const router = useRouter();
  const [sortingParams, setSortingParams] = useState<
    InvoiceSortingParams | undefined
  >(undefined);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.sortBy) {
        const parsedSortBy = parseQueryParam(router.query.sortBy);

        let sortingField: InvoiceSortingField | undefined;
        if (parsedSortBy && isInvoiceSortingField(parsedSortBy)) {
          sortingField = parsedSortBy;
        }

        const parsedSortOrder = parseQueryParam(
          router.query.sortOrder
        )?.toLowerCase();

        let sortingOrder: InvoiceSortingOrder | undefined;
        if (parsedSortOrder && isInvoiceSortingOrder(parsedSortOrder)) {
          sortingOrder = parsedSortOrder;
        }

        if (sortingField) {
          setSortingParams({
            field: sortingField,
            order: sortingOrder,
          });
        }
      } else {
        setSortingParams(undefined);
      }
    }
  }, [router.isReady, router.query.sortBy, router.query.sortOrder]);

  console.log(sortingParams);

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <InvoiceListContainer sorting={sortingParams} />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
