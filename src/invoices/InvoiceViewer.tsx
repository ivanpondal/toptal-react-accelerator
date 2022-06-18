import { Alert, Box, Divider, Typography } from "@mui/material";

export type InvoiceDetailsFormData = {
  invoiceDate: Date;
  invoiceDueDate: Date;
  invoiceNumber: string;
  invoiceProjectCode?: string;
  invoiceClientId: string;
  items: Array<{
    description: string;
    value: number;
  }>;
  total: number;
};

export type InvoiceViewerProps = {
  invoice?: InvoiceDetailsFormData;
  clientNames?: { [key: string]: { id: string; label: string } };
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
};

export default function InvoiceForm(props: InvoiceViewerProps) {
  const { clientNames, loading, errorMessage, invoice } = props;

  let clientName;
  if (clientNames && invoice?.invoiceClientId) {
    clientName = clientNames[invoice.invoiceClientId].label;
  }

  const total = invoice?.items
    .map((item) => item.value)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value))
    .filter((value) => value > 0)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <Box sx={{ mt: 1 }}>
      {errorMessage && (
        <Alert data-test="form-error" severity="error">
          {errorMessage}
        </Alert>
      )}

      <Typography variant="h2" sx={{ mt: 2 }} data-test="invoice-number">
        Invoice # {invoice?.invoiceNumber}
      </Typography>

      <Typography
        variant="h5"
        sx={{ mt: 2, textAlign: "right" }}
        data-test="invoice-date"
      >
        Date: {invoice?.invoiceDate.toLocaleDateString()}
      </Typography>

      <Typography
        variant="h5"
        sx={{ mt: 2, textAlign: "right" }}
        data-test="invoice-due-date"
      >
        Due Date: {invoice?.invoiceDueDate.toLocaleDateString()}
      </Typography>

      <Typography variant="h4" sx={{ mt: 2, textAlign: "right" }}>
        Billed to {clientName}
      </Typography>

      {invoice?.invoiceProjectCode ? (
        <Typography
          variant="h6"
          sx={{ mt: 2, textAlign: "right" }}
          data-test="invoice-project-code"
        >
          "{invoice?.invoiceProjectCode}"
        </Typography>
      ) : null}

      <Divider sx={{ mt: 3 }} />

      <Typography variant="h5" sx={{ mt: 2 }}>
        {" "}
        Invoice items
      </Typography>

      <Box sx={{ display: "flex", alignItems: "baseline", mt: 4 }}>
        <Typography variant="button" sx={{ flexGrow: 1 }}>
          Description
        </Typography>

        <Typography variant="button">Value</Typography>
      </Box>

      {invoice?.items.map((item, index) => (
        <div key={index} data-test={`invoice-item-${index + 1}`}>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              variant="subtitle1"
              sx={{ flexGrow: 1 }}
              data-test="invoice-item-description"
            >
              {item.description}
            </Typography>

            <Typography
              variant="h6"
              sx={{ mt: 2 }}
              data-test="invoice-item-value"
            >
              {item.value}
            </Typography>
          </Box>
        </div>
      ))}

      <Box sx={{ display: "flex", alignItems: "baseline", mt: 6 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Total
        </Typography>

        <Typography variant="h5">$ &nbsp;</Typography>

        <Typography variant="h4" data-test="invoice-total">
          {total}
        </Typography>
      </Box>
    </Box>
  );
}
