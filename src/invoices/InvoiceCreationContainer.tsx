import InvoiceForm from "./InvoiceForm";

export default function InvoiceCreationContainer() {
  return <InvoiceForm onSubmitRequest={(val) => console.log(val)} />;
}
