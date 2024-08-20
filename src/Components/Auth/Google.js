import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import AuthApi from "../../Apis/AuthApi";
import {setToken} from "../../Redux/auth/authSlice";
import Helper from "../../utils/helpers";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const Google = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSuccess = async (response) => {
        try {
            const res = await AuthApi.google({token: response.credential});
            dispatch(setToken(res.data.accessToken) );
            navigate('/');
            Helper.toastSuccess('Đăng nhập thành công!');
        } catch (error) {
            Helper.parseError(error);
        }
    };

    const handleError = (error) => {
        console.error('Error:', error);
    };

    return (
        <GoogleOAuthProvider clientId="433942247848-u49shd599e24tin5b8i73en937r8tlob.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            />
        </GoogleOAuthProvider>
    );
};

export default Google;
