import axios, { AxiosError } from "axios";

export const invoiceBackendAPI = axios.create({
  baseURL: "http://localhost:3139",
});

export const UserAPI = {
  login: async (params: { email: string; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const loginResponse = await invoiceBackendAPI.post<{ token: string }>(
        "/login",
        {
          email: params.email,
          password: params.password,
        }
      );
      console.log("loginResponse", loginResponse);
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
};
