import Link from "next/link";


const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-primaryBgColor mb-4">
          🚧 Under Construction
        </h1>

        <p className="text-gray-600 mb-6">
          This page is currently under development. We are working hard to
          bring you this feature soon.
        </p>

        <div className="animate-bounce text-6xl mb-6">🔧</div>

        <Link
          href="/"
          className="inline-block bg-primaryBgColor text-white px-6 py-2 rounded-lg hover:bg-primaryBgColor transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
