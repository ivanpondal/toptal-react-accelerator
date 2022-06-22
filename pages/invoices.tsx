import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import parseQueryParam from "../src/integration/query-params";
import {
  InvoiceSortingParams,
  InvoiceSortingField,
  isInvoiceSortingField,
  InvoiceSortingOrder,
  isInvoiceSortingOrder,
} from "../src/invoices/invoice-list-types";
import { InvoiceListContainer } from "../src/invoices/InvoiceListContainer";

export default function InvoiceList() {
  const router = useRouter();
  const [sortingParams, setSortingParams] = useState<
    InvoiceSortingParams | undefined
  >(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);

  // router sorting params change event
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

  // router paging params change event
  useEffect(() => {
    if (router.isReady) {
      if (router.query.page) {
        const parsedPage = parseQueryParam(router.query.page);
        const pageNumber = parsedPage ? parseInt(parsedPage) : NaN;
        if (!isNaN(pageNumber) && pageNumber > 0) {
          setPage(pageNumber);
        }
      } else {
        setPage(undefined);
      }
    }
  }, [router.isReady, router.query.page]);

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <InvoiceListContainer sorting={sortingParams} page={page} />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
