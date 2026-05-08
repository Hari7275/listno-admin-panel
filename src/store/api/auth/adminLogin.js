{/*import { getAdminToken } from "../tokenHelper";

console.log("getAdminToken......", getAdminToken());

import {apiSlice} from "../api";

export const adminUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    

    //  Admin Email Login
    createAdminLogin: builder.mutation({
      query: (body) => ({
        url: `/experience/session/auth/login`,
        method: "POST",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Adjust 'data.token' based on your actual API response structure
          if (data && data.token) {
            dispatch(setToken(data.token));
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    
    }),


  }),
});

export const { useCreateAdminLoginMutation } = adminUserSlice;*/}

import { apiSlice } from "../api";
import { setToken } from "../../slices/authSlice";

export const adminUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createRegisterDevice: builder.mutation({
      query: (body) => ({
        url: `/experience/session/auth/register-devices`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["listno"],
    }),
    
    loginWithEmail: builder.mutation({
      query: (body) => ({
        url: `/experience/session/auth/login`,
        method: "POST",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const token = data?.data?.accessToken;

          if (token) {
            dispatch(setToken(token));
            localStorage.setItem("token", token);
          }

        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),


getAdminCoachDashboard: builder.query({
  query: ({ page = 0, size = 10, status = "UNDER_REVIEW" }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query {
          adminCoachDashboard(page: ${page}, size: ${size}, status: "${status}") {
            content {
              coachId
              displayName
              categoryNames
              appliedDate
              online
              coachType
              verificationStatus
              profilePhoto
              bio
              rankingScore
              todayEarnings
              experienceYears
              experienceHours
              cityName
              cityId
              stateName
              visibilityStatus
              gender
              age
              introVideo
              aadhaarCardFrontKey
              aadhaarCardBackKey
              voiceSample
              email
              phone
              coachLevelName
              totalCalls
            }
            totalElements
            totalPages
            number
          }
        }
      `,
      variables: { page, size, status },
    },
  }),
}),

getAdminCoachProfile: builder.query({
  query: ({ coachId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query GetAdminCoachProfile($coachId: ID!) {
          adminCoachProfile(coachId: $coachId) {
            coachId
            displayName
            profilePhoto
            bio
            gender
            age
            email
            phone
            coachType
            verificationStatus
            visibilityStatus
            categoryNames
            cityName
            stateName
            introVideo
            aadhaarCardFrontKey
            aadhaarCardBackKey
            voiceSample
            experienceYears
            experienceHours
            coachLevelName
            totalCalls
            todayEarnings
            appliedDate
            online
          }
        }
      `,
      variables: { coachId },
    },
  }),
}),

updateCoachStatus: builder.mutation({
  query: ({ coachId, status, bodyData }) => ({
    url: `/experience/listeno/admin/coaches/${coachId}/${status}`,
    method: "POST",
    body: bodyData,
  }),
}),


  }),
});

export const {useCreateRegisterDeviceMutation,
  useLoginWithEmailMutation,
  useGetAdminCoachDashboardQuery,
  useGetAdminCoachProfileQuery,
    useUpdateCoachStatusMutation, 
} = adminUserSlice;
