import React, { useState } from 'react';
import Helper from "../../utils/helpers";
import { useSelector } from "react-redux";
import WalletApi from "../../Apis/WalletApi";

function WalletActionContent({ walletId, closeModal, handleSetNewShare, setIsLoading }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('READ_ONLY'); // Mặc định là READ_ONLY
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await WalletApi.shareWallet(walletId, {
        email: email,
        role: role
      });
      handleSetNewShare(response.data.walletRoles.filter(role => role.userId !== user.id));

      Helper.toastSuccess('Đã chia sẻ ví thành công!');
      closeModal();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data;

        if (errorMessage.includes("Người dùng không tồn tại")) {
          Helper.toastError('Người dùng không tồn tại!');
        } else if (errorMessage.includes("Ví này đã được chia sẻ với người dùng này")) {
          Helper.toastError('Ví này đã được chia sẻ với người dùng này.');
        } else {
          Helper.toastError(`Đã xảy ra lỗi: ${errorMessage}`);
        }
      } else {
         Helper.toastError('Đã xảy ra lỗi khi chia sẻ ví!');
      }
      console.error('Error sharing wallet:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} id={"form-shared-waller"}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Nhập mail của người dùng
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label">Chọn quyền:</label>
        <select
          id="role"
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="READ_ONLY">READ_ONLY</option>
          <option value="OWNER">OWNER</option>
        </select>
      </div>
    </form>
  );
}

export default WalletActionContent;
