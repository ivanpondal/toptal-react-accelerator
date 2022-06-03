import axios, { AxiosError, AxiosResponse } from "axios";
import { encode } from "punycode";

export const invoiceBackendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

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
      }
    );
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
};

export type InvoiceListingSorting = {
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
  projectCode: string;
  meta?: Record<string, any>;
};

type InvoiceWithClientDetails = {
  invoice: InvoiceData;
  client: ClientData;
};

export const InvoiceAPI = {
  getAll: async function (params: {
    sort?: InvoiceListingSorting;
    limit?: number;
  }) {
    const encodedParams = encodeURIComponent(JSON.stringify(params));

    return await executeRequest(() =>
      invoiceBackendAPI.get<{ invoices: InvoiceWithClientDetails[] }>(
        `/invoices?params=${encodedParams}`
      )
    );
  },
};
