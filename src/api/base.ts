import axios from "axios";

export const invoiceBackendAPI = axios.create({
  baseURL: "http://localhost:3139",
});

export const UserAPI = {
  login: async (params: { email: string; password: string }) => {
    const loginResponse = await invoiceBackendAPI.post("/login", {
      email: params.email,
      password: params.password,
    });

    console.log("loginResponse", loginResponse);

    return loginResponse.data;
  },
};
