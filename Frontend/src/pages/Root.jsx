import { Outlet } from "react-router-dom";
import MainNavbar from "/src/components/MainNavbar.jsx";
import Footer from "/src/components/Footer.jsx";

export default function Root() {
  return (
    <>
      <MainNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
