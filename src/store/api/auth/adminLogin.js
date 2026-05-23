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
              profilePhoto
              bio
              rankingScore
              todayEarnings
              experienceYears
              experienceHours
              cityName
              cityId
              stateName
              profileStatus
              accountStatus
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
            coachLevelName

            rankingScore
            totalCalls
            todayEarnings
            galleryImageKeys
            visibilityStatus
            profileStatus
            accountStatus

            categoryNames

            cityName
            cityId
            stateName

            introVideo
            aadhaarCardFrontKey
            aadhaarCardBackKey
            voiceSample

            experienceYears
            experienceHours

            appliedDate
            online
          }
        }
      `,
      variables: {
        coachId,
      },
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

getRecentActivity: builder.query({
  query: ({ userId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query GetRecentActivity($userId: ID!) {
          recentActivity(userId: $userId) {
            time
            title
            description
          }
        }
      `,
      variables: { userId },
    },
  }),
}),

getCoachPerformance: builder.query({
  query: ({ coachId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query GetCoachPerformance($coachId: ID!) {
          coachPerformance(coachId: $coachId) {
            coreMetrics {
              acceptanceRate
              averageDuration
              missedIgnoredCalls
              userRetentionRate
            }

            reviewRating {
              averageRating
              totalSessions

              breakdown {
                star
                percentage
              }
            }
          }
        }
      `,
      variables: { coachId },
    },
  }),
}),

getCoachFinancials: builder.query({
  query: ({ coachId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query {
          coachFinancials(
            coachId: "${coachId}"
          ) {

            overview {
              lifetimeEarnings
              availableBalance
              pendingClearance
              penalties
            }

            summary {
              todayEarnings
              weekEarnings
              monthEarnings
            }

            recentTransactions {

              transactions {
                id
                type
                title
                subtitle
                amount
                status
                transactionNature
                dateTime
              }

              pagination {
                page
                size
                totalElements
                hasNext
              }
            }
          }
        }
      `,
      variables: {},
    },
  }),
}),


getDailyStats: builder.query({
  query: ({ coachId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query {
          dailyStats(coachId: "${coachId}") {
            callsTaken
            talkTime
            earnings
          }
        }
      `,
      variables: {},
    },
  }),
}),

getActivityLogs: builder.query({
  query: ({ userId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query {

          activityLogs(
            userId: "${userId}"
          ) {

            time
            action
            details
            ipDevice
          }
        }
      `,
      variables: {},
    },
  }),
}),

getAdminLiveMonitoring: builder.query({
      query: () => ({
        url: "/experience/listeno/graphql",
        method: "POST",
        body: {
          query: `
            query {
              adminLiveMonitoring {
                liveCalls
                listenersOnline
                earningsPerHour
                sessions {
                  coachId
                  listener
                  duration
                  status
                  type
                  takingWith
                  currentEarnings
                  profilePhoto
                }
              }
            }
          `,
          variables: {},
        },
      }),
      providesTags: ['LiveMonitor'],
    }),

getDailyPerformance: builder.query({
      query: ({sortBy = "calls", type, level } = {}) => ({
        url: "/experience/listeno/graphql",
        method: "POST",
        body: {
          query: `
            query GetDailyPerformance($sortBy: String, $type: String, $level: String) {
              dailyPerformance(sortBy: $sortBy, type: $type, level: $level) {
                totalCallsToday
                avgCallDuration
                totalTalkTime
                missedRejected
                listeners {
                  listener
                  profilePhoto
                  type
                   missedRejected
                  totalCalls
                  talkTimeToday
                  avgDuration
                }
              }
            }
          `,
          variables: { sortBy },
        },
      }),
      providesTags: ['DailyPerformance'],
    }),

  }),
});

export const {useCreateRegisterDeviceMutation,
  useLoginWithEmailMutation,
  useGetAdminCoachDashboardQuery,
  useGetAdminCoachProfileQuery,
    useUpdateCoachStatusMutation, 
    useGetRecentActivityQuery,
    useGetCoachPerformanceQuery,
    useGetCoachFinancialsQuery,
    useGetDailyStatsQuery,
    useGetActivityLogsQuery,
    useGetAdminLiveMonitoringQuery,
    useGetDailyPerformanceQuery,
} = adminUserSlice;
