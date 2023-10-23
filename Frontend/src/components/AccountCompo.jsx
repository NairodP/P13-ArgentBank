/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useNavigate } from "react-router-dom";
export default function AccountCompo({ id, title, accountNumber, amount, description }) {

  const navigate = useNavigate();

  const handleViewTransactionsClick = () => {
    const accountId = id;
    navigate(`/account/${accountId}`);
  };

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title} ({accountNumber})</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" onClick={handleViewTransactionsClick}>View transactions</button>
      </div>
    </section>
  );
}