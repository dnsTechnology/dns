import { Calendar } from "lucide-react";
import { useGetAllBlogsQuery, useGetBlogByIdQuery } from "../redux/main";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

const BlogDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetBlogByIdQuery(id);
  const {
    data: blogsAll,
    isLoading: loadingAll,
    error: errorAll,
  } = useGetAllBlogsQuery({ page: 1, limit: 4 });

  const blog = data?.data;
  const blogs = blogsAll?.data?.blogs || [];
  const blogPosts = blogs?.slice(0, 4);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading || loadingAll) return <Loading />;

  if (error || errorAll)
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load blog details.
      </div>
    );

  if (!blog)
    return (
      <div className="text-center py-20 text-gray-600">Blog not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="pt-16 sm:pt-20 mt-10 md:pt-24 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row gap-8">
        {/* Blog Article */}
        <div className="lg:w-2/3 w-full">
          {/* Hero Image */}
          {blog.featuredImage && (
            <div className="mb-6 w-full h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  blog.featuredImage
                }`}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article className="bg-white p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center text-gray-500 text-sm mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(blog.createdAt)}
            </div>

            <div
              className="text-gray-700 space-y-4"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 w-full">
          <div className="bg-white w-full">
            <div className="bg-gray-50 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Latest Blog Posts
              </h2>
            </div>

            <div className="p-2 sm:p-4">
              {blogPosts?.map((post) => (
                <Link
                  key={post._id}
                  to={`/blogdetail/${post._id}`}
                  className="flex items-start gap-3 p-2 border-b border-gray-300 hover:bg-gray-100"
                >
                  <div className="w-24 sm:w-28 h-20 sm:h-24 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        post.featuredImage
                      }`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
