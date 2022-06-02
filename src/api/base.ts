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
      invoiceBackendAPI.post<{ token: string }>("/login", {
        email: params.email,
        password: params.password,
      })
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
      }>("/register", {
        name: params.name,
        email: params.email,
        password: params.password,
        confirmPassword: params.confirmPassword,
      })
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
  clientName?: "asc" | "desc";
  companyName?: "asc" | "desc";
  totalBilled?: "asc" | "desc";
  invoicesCount?: "asc" | "desc";
  creation?: "asc" | "desc";
};

export const ClientAPI = {
  getClients: async function (params: {
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
};
