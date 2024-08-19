import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import {fetchUser, setToken} from "../Redux/auth/authSlice";
import {fetchWallets} from "../Redux/wallet/walletSlice";
import {fetchCategories} from "../Redux/category/categorySlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);

  // Fetch user information if token is present on the first load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
      dispatch(fetchUser());
      dispatch(fetchWallets());
      dispatch(fetchCategories());
    }
  }, [dispatch, userId]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;