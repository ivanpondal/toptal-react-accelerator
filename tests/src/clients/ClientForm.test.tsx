import renderer from "react-test-renderer";
import ClientForm, {
  ClientDetailsFormData,
} from "../../../src/clients/ClientForm";

const clientDetails: ClientDetailsFormData = {
  clientName: "Roger Clinton",
  clientEmail: "inc@macys.com",
  companyName: "Macys",
  companyAddress: "Av Stret 3423",
  vatNumber: "234-35434-43",
  registrationNumber: "0003402320",
};

describe("client details", () => {
  it("should render as form fields", () => {
    const tree = renderer
      .create(
        <ClientForm onSubmitRequest={(_) => {}} clientDetails={clientDetails} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("error message", () => {
  it("should render before form", () => {
    const tree = renderer
      .create(
        <ClientForm
          onSubmitRequest={(_) => {}}
          clientDetails={clientDetails}
          errorMessage="I'm an error message!"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
