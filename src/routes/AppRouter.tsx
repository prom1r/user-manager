import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import HomePage from "../pages/HomePage";
const UserDetails = lazy(() => import("../components/user/UserDetails"));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
};

export default AppRouter;
