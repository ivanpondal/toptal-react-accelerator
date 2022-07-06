import { Container, Box, useMediaQuery } from "@mui/material";
import { AuthGuard } from "../../../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../../../src/company/CompanyDetailsGuard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parseQueryParam from "../../../src/integration/query-params";
import InvoiceViewerContainer from "../../../src/invoices/InvoiceViewerContainer";
import NavBarContainer from "../../../src/components/NavBarContainer";

export default function ViewInvoice() {
  const router = useRouter();
  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);
  const [print, setPrint] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady && !invoiceId) {
      setInvoiceId(parseQueryParam(router.query.id));
    }
  }, [router.isReady, router.query.id, invoiceId]);

  useEffect(() => {
    if (router.isReady && !print) {
      setPrint(parseQueryParam(router.query.print) === "true");
    }
  }, [router.isReady, router.query.print, print]);

  return (
    <AuthGuard>
      <NavBarContainer />
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="xl">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InvoiceViewerContainer invoiceId={invoiceId} print={print} />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
