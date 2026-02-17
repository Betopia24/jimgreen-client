import { Loader } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <Loader size={50} className="animate-spin text-primary" />
    </div>
  );
};

export default FullScreenLoader;
