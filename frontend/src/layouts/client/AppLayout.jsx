import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfilePatients } from "@/services/authApi";
import { setUserProfile } from "@/redux/authSlice";

export default function AppLayout() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenUrl = urlParams.get("accessToken");

    if (accessTokenUrl) {
      localStorage.setItem("accessToken", accessTokenUrl);
      location.href = "/user-profile";
    } else {
      const fetchUserProfile = async () => {
        if (!userProfile && accessToken) {
          try {
            const userData = await getProfilePatients(accessToken);
            dispatch(setUserProfile(userData));
          } catch (error) {
            console.error("Failed to fetch user profile:", error);
          }
        }
      };

      fetchUserProfile();
    }
  }, [userProfile, dispatch, accessToken]);

  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </>
  );
}
