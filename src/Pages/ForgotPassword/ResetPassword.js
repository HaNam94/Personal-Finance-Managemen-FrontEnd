import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Helper from '../../utils/helpers';
import Footer from "../../Components/Footer";
import Orb from "../../Components/Orb/Orb";
import PasswordInput from '../../Components/Auth/PasswordInput';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const navigate = useNavigate();

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Helper.toastError('Mật khẩu và mật khẩu xác nhận không khớp.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/v1/public/reset-password', {
        token,
        newPassword: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      Helper.toastSuccess('Mật khẩu đã được đặt lại thành công.');
      navigate('/login');
    } catch (error) {
      Helper.parseError(error);
    }
  };

  return (
    <div id="main-wrapper" className="login-page">
      {orbMemo}
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <a href="/" className="brand-logo">
                        {/* SVG Logo */}
                      </a>
                    </div>
                    <h3 className="text-center mb-4 mt-2">Đặt lại mật khẩu</h3>
                    {message && <div className="alert alert-info text-center">{message}</div>}
                    <form onSubmit={handleResetPassword}>
                      <PasswordInput
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <PasswordInput
                        label="Xác nhận mật khẩu"
                        placeholder="Nhập lại mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block">
                          Đặt lại mật khẩu
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p>
                        Quay lại{" "}
                        <Link to="/" className="text-primary">
                          Trang chủ
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
