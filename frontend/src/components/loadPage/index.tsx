import { Outlet } from "react-router";

import { LoadingSpinner } from "../loadingSpinner";
import { useData } from "@/contexts/data/useData";

const LoadPage = () => {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <Outlet />;
};

export { LoadPage };
