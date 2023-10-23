import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetAuthState } from "../redux/features/AuthSlice";
import "/src/css/components/mainNavbar.css";
import { resetUserProfile } from "../redux/features/UserProfileSlice";

export default function MainNavbar() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.userProfile);

  const handleLogout = () => {
    dispatch(resetAuthState());
    dispatch(resetUserProfile());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {userToken ? ( // Vérification de la présence de userToken
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </Link>
            <Link className="main-nav-item" to="/login" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}