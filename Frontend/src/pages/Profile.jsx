import "/src/css/pages/OtherPages.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/features/AuthActions";
import AccountCompo from "/src/components/AccountCompo.jsx";
import EditUser from "/src/components/EditUser.jsx";
import accountData from "../assets/data/accountsData.json";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken) {
      // Dispatch fetchUserProfile lorsque le token de l'utilisateur est disponible
      dispatch(fetchUserProfile());
    }
  }, [userToken, dispatch]);

  return (
    <>
      {userToken ? (
        <main className="main bg-dark">
          <EditUser />
          <h2 className="sr-only">Accounts</h2>
          {accountData.map((account, index) => (
            <AccountCompo
              key={index}
              id={account.id}
              title={account.title}
              accountNumber={account.accountNumber}
              amount={account.amount}
              description={account.description}
            />
          ))}
        </main>
      ) : (
        Navigate("/")
      )}
    </>
  );
}
