import "/src/css/pages/OtherPages.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/features/AuthActions";
import HomePageBanner from "/src/components/HomePageBanner.jsx";
import Features from "/src/components/Features.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken) {
      // Dispatch fetchUserProfile lorsque le token de l'utilisateur est disponible
      dispatch(fetchUserProfile());
    }
  }, [userToken, dispatch]);

  return (
    <main>
      <HomePageBanner />
      <Features />
    </main>
  );
}
