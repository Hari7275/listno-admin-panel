// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const customBaseQuery = async (args, api, extraOptions) => {
//   const state = api.getState();

//   const prod = state.auth?.prod;

//   const baseUrl = "https://listeno-gateway-platform-staging.up.railway.app";

//   const rawBaseQuery = fetchBaseQuery({ baseUrl });
//   return rawBaseQuery(args, api, extraOptions);
// };

// const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: customBaseQuery,
//   endpoints: (builder) => ({}),
// });

// export default apiSlice;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDeviceId } from "../../lib/deviceInfo";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://listeno-gateway-platform-staging.up.railway.app",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // ✅ correct way
    const deviceId = getDeviceId();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("X-Device-Id", deviceId);
    headers.set("X-Device-Type", "WEB");
    headers.set("X-App-Version", "1.0.0");
    headers.set("X-App-Integrity", "<REAL_TOKEN>");
    headers.set("X-Language", "en");
    headers.set("X-Timezone", "Asia/Kolkata");
    headers.set("X-ISD-Code", "IN");
   headers.set("Content-Type", "application/json");


    return headers;
  },
});

{/*// 2. Wrap the baseQuery to intercept 401 errors
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // If status is 401, dispatch logout to clear state
  if (result.error && (result.error as any).status === 401) {
    api.dispatch(logout());
  }

  return result;
};
*/}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});