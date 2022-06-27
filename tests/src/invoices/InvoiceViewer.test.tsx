import renderer from "react-test-renderer";
import { InvoiceDetailsFormData } from "../../../src/invoices/InvoiceForm";
import InvoiceViewer from "../../../src/invoices/InvoiceViewer";

const invoiceWithoutProjectCode: InvoiceDetailsFormData = {
  invoiceDate: new Date("01 Jan 2022 00:00:00 GMT"),
  invoiceDueDate: new Date("10 Jan 2022 00:00:00 GMT"),
  invoiceNumber: "001",
  invoiceClientId: "1",
  items: [{ description: "Fertilizer", value: 10000 }],
  total: 10000,
};

const clientNames = {
  "1": {
    id: "1",
    label: "Fertilot",
  },
};

describe("invoice and client names props", () => {
  it("should render as invoice and billing data", () => {
    const tree = renderer
      .create(
        <InvoiceViewer
          invoice={invoiceWithoutProjectCode}
          clientNames={clientNames}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("invoice with project code and client names props", () => {
  it("should render as invoice and billing data with project code", () => {
    const invoiceWithProjectCode = {
      ...invoiceWithoutProjectCode,
      invoiceProjectCode: "cool project",
    };

    const tree = renderer
      .create(
        <InvoiceViewer
          invoice={invoiceWithProjectCode}
          clientNames={clientNames}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
