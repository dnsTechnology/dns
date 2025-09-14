// src/components/Loader.jsx
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
