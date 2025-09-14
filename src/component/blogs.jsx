import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "./nav";
import { useGetAllBlogsQuery } from "../redux/main.js";
import { useState } from "react";
import Loading from "./Loading.jsx";

const BlogLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10; // You can adjust this
  const { data, isLoading, error } = useGetAllBlogsQuery({
    page: currentPage,
    limit: blogsPerPage,
  });

  if (error) {
    <div className="error-container ">{error.data.message}</div>;
  }
  if (isLoading) {
    return <Loading />;
  }

  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.totalPages;

  // Pick featured, side, and recent posts
  const featuredPost = blogs.find((p) => p.isFeatured) || blogs[0];
  const sidePosts = blogs
    .filter((p) => p._id !== featuredPost?._id)
    .slice(0, 4);
  const recentPosts = blogs.slice(0, 6);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load blogs.
      </div>
    );
  }
  if (!blogs.length) {
    return (
      <div className="text-center py-20 text-gray-600">No blogs found.</div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />

      {/* Header */}
      <div className="pt-16 sm:pt-20 md:pt-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Insightful Blog
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Discover the latest insights, trends, and stories from our team.
          </p>
        </div>
      </div>

      {/* Featured + Side posts */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Post */}
        {featuredPost && (
          <div className="lg:col-span-2">
            <Link to={`/blogdetail/${featuredPost._id}`}>
              <div className="relative bg-gray-100  overflow-hidden transition-shadow duration-300 group">
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                  <img
                    src={
                      featuredPost.featuredImage
                        ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                            featuredPost.featuredImage
                          }`
                        : "/placeholder.svg"
                    }
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <div className="flex items-center text-gray-200 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(featuredPost.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Side Posts */}
        <div className="space-y-6">
          {sidePosts.map((post) => (
            <Link key={post._id} to={`/blogdetail/${post._id}`}>
              <div className="flex items-center gap-4 bg-white rounded-none border border-gray-100 mt-2  transition-shadow cursor-pointer overflow-hidden">
                <div className="w-28 h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={
                      post.featuredImage
                        ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                            post.featuredImage
                          }`
                        : "/placeholder.svg"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-3">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-2 group-hover:text-red-800 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 sm:mb-8 border-b border-gray-300 pb-2">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post._id} to={`/blogdetail/${post._id}`}>
                <div className="bg-white border border-gray-200  overflow-hidden  transition-shadow cursor-pointer group">
                  <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
                    <img
                      src={
                        post.featuredImage
                          ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                              post.featuredImage
                            }`
                          : "/placeholder.svg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border border-gray-300 ${
              currentPage === i + 1 ? "bg-gray-200" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-point"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogLayout;
