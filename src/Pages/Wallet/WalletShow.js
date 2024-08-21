import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import Helper from '../../utils/helpers';
import WalletForm from '../../Components/Wallet/WalletForm';
import WalletApi from '../../Apis/WalletApi';
import WalletDelete from '../../Components/Wallet/WalletDelete';
import ShareWalletForms from '../../Components/Wallet/ShareWalletForm';
import SharedUserList from '../../Components/Wallet/SharedUserList';
import Lottie from "lottie-react";
import AniEmpty from "../../LottieData/empty.json";
import {fetchWallets} from "../../Redux/wallet/walletSlice";
import {useTranslation} from "react-i18next";

const validationSchema = Yup.object({
  amount: Yup.number().min(0, 'Số tiền hiện tại phải lớn hơn 0').max(10000000000, "Số tiền quá lớn"),
  walletName: Yup.string().required('Vui lòng nhập tên ví!'),
  icon: Yup.string().required('Vui lòng chọn icon!'),
  currency: Yup.string().required('Vui lòng chọn loại tiền tệ!'),
  walletDescription: Yup.string().required('Vui lòng nhập mô tả!')
});

function WalletShow() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const { walletId } = useParams();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [sharedUsers, setSharedUsers] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await WalletApi.getWalletById(walletId);
        setWallet(response.data);
        const userRole = response.data.walletRoles.find(role => role.userId === user.id);
        setIsOwner(userRole && userRole.role === "OWNER");
        setSharedUsers(response.data.walletRoles.filter(role => role.userId !== user.id));
      } catch (error) {
        navigate("/wallets");
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const handleDelete = async () => {
    try {
      await WalletApi.deleteWallet(walletId);
      Helper.toastSuccess('Xóa ví thành công!');
      dispatch(fetchWallets());
      navigate("/wallets");
    } catch (error) {
      Helper.parseError(error);
    }
  };

  const handleUnshare = async (email) => {
    try {
      await WalletApi.unShareWallet(
        walletId,
        { params: { email } }
      );
      Helper.toastSuccess("Xóa liên kết chia sẻ thành công!");
      setSharedUsers((prevSharedUsers) => {
        return  prevSharedUsers.filter(user => user.userEmail !== email);
      });
    } catch (error) {
      Helper.toastError("Không thể xóa liên kết chia sẻ: " + (error.response?.data || error.message));
    }
  };

  const handleUpdateRole = (userId, newRole) => {
    setWallet(prevWallet => ({
      ...prevWallet,
      walletRoles: prevWallet.walletRoles.map(role =>
        role.userId === userId ? { ...role, role: newRole } : role
      )
    }));
  };

  const formik = useFormik({
    initialValues: wallet ? {
      amount: wallet.amount,
      walletName: wallet.walletName,
      icon: wallet.icon,
      currency: wallet.currency,
      walletDescription: wallet.walletDescription
    } : {
      amount: 0,
      walletName: "",
      icon: "icon_0",
      currency: "VND",
      walletDescription: ""
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await WalletApi.updateWallet(walletId, values);
        Helper.toastSuccess('Cập nhật ví thành công!');
        dispatch(fetchWallets());
        navigate("/wallets");
      } catch (error) {
        Helper.toastError('Cập nhật ví thất bại!');
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: false
  });

  return (
    <>
      <div className="card">
        <div className="card-body">
          {
            loading ? (
              <Skeleton count={2} height={200} />
            ) : (
              <WalletForm
                formik={formik}
                isUpdate={true}
                deleteBtn={isOwner ? <WalletDelete handleDelete={handleDelete} /> : null}
                isReadOnly={!isOwner}
              />
            )
          }
        </div>
      </div>
      {isOwner && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5>{t("listUserShareWallet")}</h5>
              <ShareWalletForms walletId={walletId} handleSetNewShare={setSharedUsers}/>
            </div>
            {sharedUsers.length > 0 ? (
              <SharedUserList
                sharedUsers={sharedUsers}
                walletId={walletId}
                onUpdateRole={handleUpdateRole}
                handleUnshare={handleUnshare}
              />
            ) : (
              <div className="w-25 mx-auto">
                <Lottie animationData={AniEmpty} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WalletShow;
