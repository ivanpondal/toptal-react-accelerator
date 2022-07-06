import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../src/auth/AuthGuard";
import {
  ClientSortingField,
  ClientSortingParams,
  isClientSortingField,
} from "../../src/clients/client-list-types";
import { ClientListContainer } from "../../src/clients/ClientListContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";
import NavBarContainer from "../../src/components/NavBarContainer";
import parseQueryParam from "../../src/integration/query-params";
import {
  SortingOrder,
  isSortingOrder,
} from "../../src/invoices/invoice-list-types";

export default function ClientList() {
  const router = useRouter();

  const [sortingParams, setSortingParams] = useState<
    ClientSortingParams | undefined
  >(undefined);
  // router sorting params change event
  useEffect(() => {
    if (router.isReady) {
      if (router.query.sortBy) {
        const parsedSortBy = parseQueryParam(router.query.sortBy);

        let sortingField: ClientSortingField | undefined;
        if (parsedSortBy && isClientSortingField(parsedSortBy)) {
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

  return (
    <AuthGuard>
      <NavBarContainer activePage="clients" />
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <ClientListContainer sorting={sortingParams} page={page} />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
