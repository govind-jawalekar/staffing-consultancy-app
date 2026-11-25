import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FloatingButtons from "../components/FloatingButtons";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <FloatingButtons/>
      <Outlet />
    </>
  );
}