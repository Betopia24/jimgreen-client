import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader size={40} className="animate-spin text-primary" />
    </div>
  );
};

export default PageLoader;
