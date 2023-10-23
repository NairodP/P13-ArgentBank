import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { store, persistor } from "../redux/features/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Root from "../pages/Root";
import "../css/index.css";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Account from "../pages/Account";
import Profile from "../pages/Profile";
import AuthRoot from "../components/AuthRoot";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route
        path="/profile"
        element={
          <AuthRoot>
            <Profile />
          </AuthRoot>
        }
      />
      <Route path="/account/:accountId" element={<Account />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
