
import { apiSlice } from "../api";
import { setToken } from "../../slices/authSlice";

export const adminUserList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

 // Admin Users List
    getAdminAllUsersList: builder.query({
      query: () => ({
        url: "/experience/listeno/graphql",
        method: "POST",
        body: {
          query: `
            query AdminAllUsersList {
              adminAllUsersList {
                users {
                  userId
                  name
                  location
                  roles
                  activeRole
                  status
                  actions
                  contact {
                    email
                    phone
                  }
                }
              }
            }
          `,
          variables: {},
        },
      }),

      providesTags: ["AdminUsersList"],
    }),


    getAdminUserDetailsById: builder.query({
  query: ({ userId }) => ({
    url: "/experience/listeno/graphql",
    method: "POST",
    body: {
      query: `
        query AdminUserDetailsById($userId: ID!) {
          adminUserDetailsById(userId: $userId) {
            userId
            name
            location
            roles
            activeRole
            status
            contact {
              email
              phone
            }
          }
        }
      `,
      variables: {
        userId,
      },
    },
  }),
}),

deleteUserById: builder.mutation({
  query: (arg) => {
   const userId = typeof arg === "object" && arg !== null ? arg.userId : arg;

  return {
      url: `/admin/users/${userId}/hard-delete`, 
      method: "DELETE",                    
    };
  },
  invalidatesTags: ["Users"], 
}),
  

  }),
});

export const {
    useGetAdminAllUsersListQuery,
    useGetAdminUserDetailsByIdQuery,
    useDeleteUserByIdMutation,
} = adminUserList;
