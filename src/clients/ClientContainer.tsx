import ClientForm from "./ClientForm";

export default function ClientContainer() {
  return <ClientForm onUpdateRequest={(request) => console.log(request)} />;
}
