import axios, { AxiosError } from "axios";

export const invoiceBackendAPI = axios.create({
  baseURL: "http://localhost:3139",
});

export const UserAPI = {
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
};
