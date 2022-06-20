import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import parseQueryParam from "../src/integration/query-params";
import { InvoiceListContainer } from "../src/invoices/InvoiceListContainer";

const sortingFields = [
  "total",
  "dueDate",
  "creationDate",
  "companyName",
] as const;
type SortingFieldTuple = typeof sortingFields;
type SortingField = SortingFieldTuple[number];

type SortingParams = {
  sortBy?: SortingField;
  sortOrder?: "ASC" | "DESC";
};

function isSortingField(value: string): value is SortingField {
  return sortingFields.includes(value as SortingField);
}

export default function InvoiceList() {
  const router = useRouter();
  const [sortingParams, setSortingParams] = useState<SortingParams>({});

  useEffect(() => {
    if (router.isReady) {
      if (router.query.sortBy) {
        const parsedSortBy = parseQueryParam(router.query.sortBy);

        if (parsedSortBy && isSortingField(parsedSortBy)) {
          setSortingParams((sortingParams) => {
            return {
              ...sortingParams,
              sortBy: parsedSortBy,
            };
          });
        }
      }
    }
  }, [router.isReady, router.query.sortBy]);

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <InvoiceListContainer />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
