import axios, { AxiosError } from "axios";

export const invoiceBackendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const UserAPI = {
  initApiToken: (token: string, handleTokenExpired: () => unknown) => {
    invoiceBackendAPI.interceptors.request.use((req) => {
      if (!req.headers) {
        req.headers = {};
      }
      req.headers["x-access-token"] = token;
      return req;
    });

    invoiceBackendAPI.interceptors.response.use(
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
    try {
      const loginResponse = await invoiceBackendAPI.post<{ token: string }>(
        "/login",
        {
          email: params.email,
          password: params.password,
        }
      );
      return loginResponse.data;
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
  },
  register: async (params: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const registerResponse = await invoiceBackendAPI.post<{
        user_id: string;
      }>("/register", {
        name: params.name,
        email: params.email,
        password: params.password,
        confirmPassword: params.confirmPassword,
      });
      return { userId: registerResponse.data.user_id };
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
  },
  updateCompanyDetails: async (params: {
    name: string;
    address: string;
    vatNumber: string;
    regNumber: string;
    iban?: string;
    swift?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const registerResponse = await invoiceBackendAPI.put<{
        success: boolean;
      }>("/me/company", params);
      return registerResponse.data;
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
  },
};
