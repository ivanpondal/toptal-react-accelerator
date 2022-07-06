import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";
import NavBarContainer from "../../src/components/NavBarContainer";
import parseQueryParam from "../../src/integration/query-params";
import {
  InvoiceSortingParams,
  InvoiceSortingField,
  isInvoiceSortingField,
  SortingOrder,
  isSortingOrder,
} from "../../src/invoices/invoice-list-types";
import { InvoiceListContainer } from "../../src/invoices/InvoiceListContainer";

export default function InvoiceList() {
  const router = useRouter();

  const [sortingParams, setSortingParams] = useState<
    InvoiceSortingParams | undefined
  >(undefined);
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

        let sortingOrder: SortingOrder | undefined;
        if (parsedSortOrder && isSortingOrder(parsedSortOrder)) {
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

  const [page, setPage] = useState<number | undefined>(undefined);
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

  const [companyNameFilter, setCompanyNameFilter] = useState<
    string | undefined
  >(undefined);
  // router filtering params change event
  useEffect(() => {
    if (router.isReady) {
      if (router.query.companyFilter) {
        const companyName = parseQueryParam(router.query.companyFilter);
        if (companyName) {
          setCompanyNameFilter(companyName);
        }
      } else {
        setCompanyNameFilter(undefined);
      }
    }
  }, [router.isReady, router.query.companyFilter]);

  return (
    <AuthGuard>
      <NavBarContainer activePage="invoices" />
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <InvoiceListContainer
            sorting={sortingParams}
            page={page}
            companyNameFilter={companyNameFilter}
          />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
