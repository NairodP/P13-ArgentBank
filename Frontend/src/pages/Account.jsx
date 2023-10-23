import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import transactions from "../assets/data/transactions.json";
import accountsData from "../assets/data/accountsData.json";
import "../css/pages/Account.css";

export default function Account() {
  const { accountId } = useParams();
  const [openRows, setOpenRows] = useState({});

  const account = accountsData.find((account) => account.id === accountId);
  // console.log(account);

  const accountTransactions = transactions.filter(
    (allAccountTransactions) => allAccountTransactions.accountId === accountId
  );
  // console.log(accountTransactions);

  const formatAmount = (amount, type) => {
    const formattedAmount = `$${Math.abs(amount).toFixed(2)}`;
    return type === "gain" ? `+ ${formattedAmount}` : formattedAmount;
  };

  const handleRowClick = (rowIndex) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [rowIndex]: !prevState[rowIndex],
    }));
  };

  return (
    <>
      {account ? (
        <>
          <div className="account-page-bg">
            <section className="account-informations">
              <h3 className="account-title">
                {account.title} ({account.accountNumber})
              </h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-description">{account.description}</p>
            </section>
          </div>
          <div className="container-table">
            <TableContainer className="table-transactions">
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell width={"50px"} />
                    <TableCell className="table-cell-header">DATE</TableCell>
                    <TableCell className="table-cell-header">DESCRIPTION</TableCell>
                    <TableCell className="table-cell-header">AMOUNT</TableCell>
                    <TableCell className="table-cell-header">BALANCE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-transactions-body">
                  {accountTransactions.map((transaction, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      <TableRow>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowClick(rowIndex)}
                          >
                            {openRows[rowIndex] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">{transaction.date}</TableCell>
                        <TableCell align="center">
                          {transaction.description}
                        </TableCell>
                        <TableCell align="center">
                          {formatAmount(transaction.amount)}
                        </TableCell>
                        <TableCell align="center">
                          {formatAmount(transaction.balance)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={5}
                        >
                          <Collapse
                            in={openRows[rowIndex]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Transaction Details
                              </Typography>
                              <div className="transaction-details">
                                <p>Transaction Type: {transaction.type}</p>
                                <p>Category:</p>
                                <p>Notes:</p>
                              </div>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <div className="error-account">
          Account not found...
          <Link className="error-account-link" to="/">
            Back to Home
          </Link>
        </div>
      )}
    </>
  );
}
