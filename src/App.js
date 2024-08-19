import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap-daterangepicker';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Pages/DashBoard/Dashboard";
import Wallet from "./Pages/Wallet/Wallet";
import Transaction from "./Pages/Transaction/Transaction";
import Budget from "./Pages/Bubget/Budget";
import Error404 from "./Pages/Error/404";
import Login from "./Pages/Authen/Login";
import Signup from "./Pages/Authen/Signup";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
import Profile from "./Pages/Profile/Profile";
import {ToastContainer} from "react-toastify";
import {Provider, useSelector} from "react-redux";
import store from './Redux/store';
import ProtectedRoute from "./Components/ProtectedRoute";
import Upgrade from "./Pages/Upgrade/Upgrade";
import ConfirmEmail from "./Pages/Authen/ConfirmEmail";
import VerifyAccount from "./Pages/Authen/VerifyAccount";
import WalletNew from "./Pages/Wallet/WalletNew";
import WalletShow from "./Pages/Wallet/WalletShow";
import Category from "./Pages/Category/Category";
import CategoryNew from "./Pages/Category/CategoryNew";
import './translate/i18n';

import CategoryShow from "./Pages/Category/CategoryShow";
import {IntlProvider} from "react-intl";
import {useTranslation} from "react-i18next";
import Report from "./Pages/Report/Report";
import Setting from "./Pages/Setting/Setting";
import Helper from "./utils/helpers";


function App() {
  const { i18n } = useTranslation();

  return (
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/comfirm-email" element={<ConfirmEmail />} />
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />} >
                <Route index element={<Dashboard />} />
                <Route path="/wallets" element={<Wallet />} />
                <Route path="/wallets/new" element={<WalletNew />} />
                <Route path="/wallets/:walletId" element={<WalletShow />} />
                <Route path="/transactions" element={<Transaction />} />
                <Route path="/budgets" element={<Budget />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/categories/new" element={<CategoryNew />} />
                <Route path="/categories/:categoryId" element={<CategoryShow />} />
              </Route>
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
    </Provider>

  );
}

export default App;
