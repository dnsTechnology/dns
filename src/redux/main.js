import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dnsTech = createApi({
  reducerPath: "dnsTech",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    credentials: "include", // ✅ set here for all requests,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST", // ✅ use POST
      }),
    }),
    getMyDetails: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    createBlog: builder.mutation({
      query: (body) => ({
        url: "/blogs/create",
        method: "POST",
        body,
      }),
    }),
    getAllBlogs: builder.query({
      query: ({ page, limit }) => ({
        url: `/blogs/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/update/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/category/create",
        method: "POST",
        body,
      }),
    }),
    getAllCategories: builder.query({
      query: (page, limit) => ({
        url: `/category/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: (id, body) => ({
        url: `/category/update/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
    }),
    //product category

    createProductCategory: builder.mutation({
      query: (body) => ({
        url: "/product/create/category",
        method: "POST",
        body,
      }),
    }),
    getAllProductCategories: builder.query({
      query: (page, limit) => ({
        url: `/product/category/all?page=${page}&limit=${limit}`, // ✅ fixed
        method: "GET",
      }),
    }),
    getProductCategoryById: builder.query({
      query: (id) => ({
        url: `/product/category/${id}`, // ✅ fixed
        method: "GET",
      }),
    }),
    updateProductCategory: builder.mutation({
      query: (id, body) => ({
        url: `/product/update/category/${id}`, // ✅
        method: "PUT",
        body,
      }),
    }),
    deleteProductCategory: builder.mutation({
      query: (id) => ({
        url: `/product/delete/category/${id}`, // ✅
        method: "DELETE",
      }),
    }),

    //product related
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/product/create",
        method: "POST",
        body,
      }),
    }),
    getAllProducts: builder.query({
      query: (page, limit) => ({
        url: `/product/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body,
      }),
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
    }),

    //team
    createTeam: builder.mutation({
      query: ({ body }) => ({
        url: "/team/create",
        method: "POST",
        body,
      }),
    }),
    getAllTeams: builder.query({
      query: () => ({
        url: `/team/all?page=${1}&limit=${100}`,
        method: "GET",
      }),
    }),
    getTeamById: builder.query({
      query: ({ id }) => ({
        url: `/team/${id}`,
        method: "GET",
      }),
    }),
    updateTeam: builder.mutation({
      query: ({ id, body }) => ({
        url: `/team/update/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (id) => {
        return {
          url: `/team/delete/${id}`,
          method: "DELETE",
        };
      },
    }),

    //order
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders/create",
        method: "POST",
        body,
      }),
    }),
    getAllOrders: builder.query({
      query: ({ page, limit }) => ({
        url: `/orders?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/getorder/${id}`,
        method: "GET",
      }),
    }),
    sendMailBackForOrder: builder.mutation({
      query: (bodyData) => {
        return {
          url: `/orders/send-email`,
          method: "POST",
          body: bodyData,
        };
      },
    }),
    changeStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body,
      }),
    }),

    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body,
      }),
    }),
    //enquiry
    createEnquiry: builder.mutation({
      query: (body) => ({
        url: "/enquiry/create",
        method: "POST",
        body,
      }),
    }),
    getAllEnquiries: builder.query({
      query: ({ page, limit, status }) => ({
        url: `/enquiry/all?page=${page}&limit=${limit}&status=${status}`,
        method: "GET",
      }),
    }),
    changeEnquiryStatus: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/enquiry/${id}/status`,
          method: "PATCH",
          body,
        };
      },
    }),
    getEnquiryById: builder.query({
      query: ({ id }) => ({
        url: `/enquiry/${id}`,
        method: "GET",
      }),
    }),

    //projects

    createProject: builder.mutation({
      query: (body) => ({
        url: "/project/create",
        method: "POST",
        body,
      }),
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: `/project/all`,
        method: "GET",
      }),
    }),
    getProjectById: builder.query({
      query: ({ id }) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, body }) => ({
        url: `/project/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
    }),
    //jobs
    createJob: builder.mutation({
      query: (body) => ({
        url: "/jobs/create",
        method: "POST",
        body,
      }),
    }),
    getAllJobs: builder.query({
      query: ({ page, limit }) => ({
        url: `/jobs/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getJobById: builder.query({
      query: ({ id }) => {
        return {
          url: `/jobs/${id}`,
          method: "GET",
        };
      },
    }),
    updateJob: builder.mutation({
      query: ({ id, body }) => ({
        url: `/jobs/update/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/delete/${id}`,
        method: "DELETE",
      }),
    }),

    //job category
    createJobCategory: builder.mutation({
      query: (body) => ({
        url: "/jobs/category/create",
        method: "POST",
        body,
      }),
    }),
    getAllJobCategories: builder.query({
      query: () => ({
        url: `/jobs/categories/getall`, // ✅ fixed
        method: "GET",
      }),
    }),
    getJobCategoryById: builder.query({
      query: (id) => ({
        url: `/jobs/category/${id}`, // ✅ fixed
        method: "GET",
      }),
    }),
    updateJobCategory: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/jobs/update/category/${id}`, // ✅
          method: "PUT",
          body,
        };
      },
    }),
    deleteJobCategory: builder.mutation({
      query: (id) => ({
        url: `/jobs/delete/category/${id}`, // ✅
        method: "DELETE",
      }),
    }),
    //job application
    createJobApplication: builder.mutation({
      query: ({ body }) => ({
        url: "/application/create",
        method: "POST",
        body,
      }),
    }),
    getallApplicationswithJobId: builder.query({
      query: ({ id }) => ({
        url: `application/all/${id}`,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMyDetailsQuery,
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  //product category
  useCreateProductCategoryMutation,
  useGetAllProductCategoriesQuery,
  useGetProductCategoryByIdQuery,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  //product
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  //team
  useCreateTeamMutation,
  useGetAllTeamsQuery,
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,

  //order
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useChangeStatusMutation,
  useGetOrderByIdQuery,
  useSendMailBackForOrderMutation,
  useUpdateOrderMutation,

  //enquiry
  useCreateEnquiryMutation,
  useGetAllEnquiriesQuery,
  useChangeEnquiryStatusMutation,
  useGetEnquiryByIdQuery,

  //projects
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useDeleteProjectMutation,

  //jobs
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,

  //job category
  useCreateJobCategoryMutation,
  useGetAllJobCategoriesQuery,
  useGetJobCategoryByIdQuery,
  useUpdateJobCategoryMutation,
  useDeleteJobCategoryMutation,

  //job application
  useCreateJobApplicationMutation,
  useGetallApplicationswithJobIdQuery,
} = dnsTech;
