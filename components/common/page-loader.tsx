import { FaSpinner } from "react-icons/fa";

const PageLoader = () => {
  return (
    <div className="w-full h-screen max-h-[90vh] flex items-center justify-center">
      <FaSpinner className="text-3xl animate-spin text-blue-400" />
    </div>
  );
};

export default PageLoader;
