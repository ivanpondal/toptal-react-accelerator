import axios, { AxiosError, AxiosResponse } from "axios";
import { GraphQLClient, request as gqlRequest, gql } from "graphql-request";
import { ClientSortingParams } from "../clients/client-list-types";

export const invoiceBackendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

let graphQLClient: GraphQLClient | undefined;
const graphqlBaseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`;

async function executeRequest<T>(
  request: () => Promise<AxiosResponse<T, any>>
) {
  try {
    const requestResponse = await request();
    return requestResponse.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject("Network Error");
      }
    }

    return Promise.reject("Unkown Error");
  }
}

export type CompanyDetails = {
  name: string;
  address: string;
  vatNumber: string;
  regNumber: string;
  iban?: string;
  swift?: string;
};

export type User = {
  name: string;
  companyDetails?: CompanyDetails;
};

export const UserAPI = {
  tokenInterceptor: NaN,
  invalidTokenInterceptor: NaN,

  initApiToken: function (token: string, handleTokenExpired: () => unknown) {
    invoiceBackendAPI.interceptors.request.eject(this.tokenInterceptor);
    this.tokenInterceptor = invoiceBackendAPI.interceptors.request.use(
      (req) => {
        if (!req.headers) {
          req.headers = {};
        }
        req.headers["x-access-token"] = token;
        return req;
      }
    );

    invoiceBackendAPI.interceptors.request.eject(this.invalidTokenInterceptor);
    this.invalidTokenInterceptor = invoiceBackendAPI.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error instanceof AxiosError) {
          if (error && error.response?.data === "Invalid Token") {
            handleTokenExpired();
          }
        }
        return Promise.reject(error);
      }
    );

    graphQLClient = new GraphQLClient(graphqlBaseURL, {
      headers: {
        ["x-access-token"]: token,
      },
    });
  },

  login: async (params: { email: string; password: string }) => {
    return await executeRequest(() =>
      invoiceBackendAPI.post<{ token: string }>("/login", params)
    );
  },
  register: async (params: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return executeRequest(() =>
      invoiceBackendAPI.post<{
        user_id: string;
      }>("/register", params)
    ).then((response) => {
      return {
        userId: response.user_id,
      };
    });
  },
  updateCompanyDetails: async (params: {
    name: string;
    address: string;
    vatNumber: string;
    regNumber: string;
    iban?: string;
    swift?: string;
  }) => {
    return executeRequest(() =>
      invoiceBackendAPI.put<{
        success: boolean;
      }>("/me/company", params)
    );
  },
  me: async () => {
    return executeRequest(() => invoiceBackendAPI.get<User>("/me"));
  },
};

export type ClientInvoicesAggregate = {
  totalBilled: number;
  invoicesCount: number;
  id: string;
  user_id: string;
  email: string;
  name: string;
  companyDetails: CompanyDetails;
};

export type ClientListingSorting = {
  creation?: "asc" | "desc";
};

export type ClientData = {
  id: string;
  user_id: string;
  email: string;
  name: string;
  companyDetails: CompanyDetails;
};

export type ClientName = {
  id: string;
  companyName: string;
};

const getAllClientsQuery = gql`
  query getAllClients($sort: ClientListSortSchema, $offset: Int!, $limit: Int!) {
    clients(sort: $sort, limit: $limit, offset: $offset) {
      results {
        id
        name
        companyDetails {
          name
        }
        totalBilled
        invoicesCount
      }
      total
    }
  }
`;

export const ClientAPI = {
  getAll: async function (params: {
    sort?: ClientListingSorting;
    limit?: number;
  }) {
    const encodedParams = encodeURIComponent(JSON.stringify(params));

    return await executeRequest(() =>
      invoiceBackendAPI.get<{ clients: ClientInvoicesAggregate[] }>(
        `/clients?params=${encodedParams}`
      )
    );
  },
  create: async function (params: Omit<ClientData, "id" | "user_id">) {
    return await executeRequest(() =>
      invoiceBackendAPI.post<{ client: ClientData }>("/clients", params)
    );
  },
  update: async function (params: Omit<ClientData, "user_id">) {
    return await executeRequest(() =>
      invoiceBackendAPI.put<{ client: ClientData }>("/clients", params)
    );
  },
  getById: async function (id: string) {
    return await executeRequest(() =>
      invoiceBackendAPI.get<{ client: ClientData }>(`/clients/${id}`)
    );
  },
  getAllNames: async function () {
    return await executeRequest(() =>
      invoiceBackendAPI.get<{ clients: Array<ClientName> }>("/clients/names")
    );
  },

  gqlGetAll: async function (params: {
    sort?: ClientSortingParams;
    offset?: number;
    limit?: number;
  }) {
    const { sort, offset = 0, limit = 10 } = params;

    let apiSortModel;
    if (sort && sort.field) {
      apiSortModel = {
        [sort.field]: sort.order,
      };
    }

    try {
      if (!graphQLClient) {
        throw new Error("GraphQL client not initialized");
      }
      const requestResponse = await graphQLClient.request<{
        clients: {
          results: {
            id: string;
            name: string;
            companyDetails: { name: string };
            totalBilled: number;
            invoicesCount: number;
          }[];
          total: number;
        };
      }>(getAllClientsQuery, {
        sort: apiSortModel,
        offset: offset,
        limit: limit,
      });
      return requestResponse;
    } catch (error) {
      return Promise.reject("Unkown Error");
    }
  },
};

export type InvoiceListingSorting = {
  date?: "asc" | "desc";
  price?: "asc" | "desc";
  companyName?: "asc" | "desc";
  dueDate?: "asc" | "desc";
  creation?: "asc" | "desc";
};

export type InvoiceData = {
  id: string;
  invoice_number: string;
  user_id: string;
  client_id: string;
  date: number;
  dueDate: number;
  value: number;
  projectCode?: string;
  meta?: { items: Array<{ description: string; value: number }> };
};

type InvoiceWithClientDetails = {
  invoice: InvoiceData;
  client: ClientData;
};

export const InvoiceAPI = {
  getAll: async function (params: {
    sort?: InvoiceListingSorting;
    offset?: number;
    limit?: number;
    filter?: { clientId?: string };
  }) {
    const encodedParams = encodeURIComponent(JSON.stringify(params));

    return await executeRequest(() =>
      invoiceBackendAPI.get<{
        invoices: InvoiceWithClientDetails[];
        total: number;
      }>(`/invoices?params=${encodedParams}`)
    );
  },
  getById: async function (id: string) {
    return await executeRequest(() =>
      invoiceBackendAPI.get<{ invoice: InvoiceData }>(`/invoices/${id}`)
    );
  },
  create: async function (params: Omit<InvoiceData, "id" | "user_id">) {
    return await executeRequest(() =>
      invoiceBackendAPI.post<{ invoice: InvoiceData }>("/invoices", params)
    );
  },
  update: async function (params: Omit<InvoiceData, "user_id">) {
    return await executeRequest(() =>
      invoiceBackendAPI.put<{ invoice: InvoiceData }>("/invoices", params)
    );
  },
};
