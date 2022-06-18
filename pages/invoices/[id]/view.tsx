import { Container, Box, Typography } from "@mui/material";
import { AuthGuard } from "../../../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../../../src/company/CompanyDetailsGuard";
import InvoiceUpdateContainer from "../../../src/invoices/InvoiceUpdateContainer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parseQueryParam from "../../../src/integration/query-params";
import InvoiceViewerContainer from "../../../src/invoices/InvoiceViewerContainer";
export default function EditInvoice() {
  const router = useRouter();
  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady && !invoiceId) {
      setInvoiceId(parseQueryParam(router.query.id));
    }
  }, [router.isReady, router.query.id, invoiceId]);

  return (
    <AuthGuard>
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
            <InvoiceViewerContainer invoiceId={invoiceId} />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
