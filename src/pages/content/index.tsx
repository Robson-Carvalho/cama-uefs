import { Header } from "@/components/header";
import { BodyLayout } from "@/layouts/Body";
import { useEffect } from "react";
import { useLocation } from "react-router";

const Content = () => {
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <>
      <Header />
      <BodyLayout></BodyLayout>
    </>
  );
};

export { Content };
