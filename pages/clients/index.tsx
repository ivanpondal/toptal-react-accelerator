import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../src/auth/AuthGuard";
import { ClientListContainer } from "../../src/clients/ClientListContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";
import parseQueryParam from "../../src/integration/query-params";

export default function ClientList() {
  const router = useRouter();

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
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <ClientListContainer page={page} />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
