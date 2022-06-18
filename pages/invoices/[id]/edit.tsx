import { Container, Box, Typography } from "@mui/material";
import { AuthGuard } from "../../../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../../../src/company/CompanyDetailsGuard";
import InvoiceUpdateContainer from "../../../src/invoices/InvoiceUpdateContainer";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import parseQueryParam from "../../../src/integration/query-params";

// this is overkill, I wanted to play around with state management
type InvoiceRouterStateAction = {
  type: "router-change";
  apply: (state: InvoiceRouterState) => InvoiceRouterState;
};

type InvoiceRouterState = {
  name: "init" | "hydrated";
  transition: (action: InvoiceRouterStateAction) => InvoiceRouterState;
  invoiceId?: string;
  onRouterChange: (router: any) => InvoiceRouterState;
};

const reducer = (
  state: InvoiceRouterState,
  action: InvoiceRouterStateAction
): InvoiceRouterState => {
  return state.transition(action);
};

const hydratedState = (invoiceId?: string): InvoiceRouterState => {
  return {
    name: "hydrated",
    transition: (action: InvoiceRouterStateAction) => {
      return action.apply(hydratedState(invoiceId));
    },
    onRouterChange: (_: any) => {
      return hydratedState(invoiceId);
    },
    invoiceId: invoiceId,
  };
};

const initState: InvoiceRouterState = {
  name: "init",
  transition: function (action: InvoiceRouterStateAction) {
    return action.apply(this);
  },
  onRouterChange: function (router: any) {
    if (router.isReady) {
      return hydratedState(parseQueryParam(router.query.id));
    } else {
      return initState;
    }
  },
};

const createRouterChangeAction = (router: any): InvoiceRouterStateAction => {
  return {
    type: "router-change",
    apply: (state: InvoiceRouterState) => state.onRouterChange(router),
  };
};

export default function EditInvoice() {
  const router = useRouter();

  const [state, dispatch] = useReducer(
    reducer,
    router.isReady ? hydratedState(parseQueryParam(router.query.id)) : initState
  );

  useEffect(() => {
    dispatch(createRouterChangeAction(router));
  }, [state.name, router.isReady, router.query.id]);

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InvoiceUpdateContainer invoiceId={state.invoiceId} />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
