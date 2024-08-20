import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "transaction": "Transaction",
      "description": "This is a simple description",
      "wallet": "Wallet",
      "dashboard": "Dashboard",
      "budget": "Budget",
      "category": "Category",
      "report": "Report",
      "setting": "Setting",
      "profile": "Profile",
    }
  },
  vi: {
    translation: {
      "dashboard": "Tổng quan",
      "wallet": "Ví tiền",
      "transaction": "Giao dịch",
      "budget": "Ngân sách",
      "category": "Phân loại",
      "report": "Báo cáo",
      "profile": "Tài khoản",
      "setting": "Cài đặt",
      "totalBalance": "Tổng tiền hiện có",
      "percentageChange": "so với tuần trước",
      "totalTransactions": "Số lượng giao dịch",
      "totalIncome": "Tổng thu",
      "totalExpense": "Tổng chi",
      "recentTransactions": "Giao Dịch Gần Đây",
      "lastFiveTransactions": "5 giao dịch gần nhất",
      "overviewWallet": "Tổng quan ví tiền",
      "percentComplete": "Hoàn thành",
      "transactionDetails": "Chi tiết giao dịch",
      "developedBy": "Copyright © Designed & Developed by C02 Codegym HN x ĐN 2024",
      "currentMonth": "Trong tháng này",
      "increase": "+",
      "decrease": "-",
      "time": "Giờ",
      "amount": "Số tiền",
      "currencyUnit": "đ",
      "addIncome": "Thêm Khoản Thu",
      "addExpense": "Thêm Khoản Chi",
      "transferMoney": "Chuyển tiền",
      "note": "Ghi chú",
      "transactionDate": "Ngày thu",
      "transactionType": "Loại giao dịch",
      "selectOption": "Select...",
      "categoryType": "Loại phân loại",
      "categoryName": "Tên phân loại",
      "categoryIcon": "Icon phân loại",
      "fullName": "Họ và tên",
      "email": "Email",
      "phoneNumber": "Số điện thoại",
      "dob": "Ngày sinh",
      "freeAccount": "Tài khoản miễn phí nâng cấp ngay!",
      "titleTabBar": "Ứng dụng quản lý tài chính",
      "minides":"© 2024 All Rights Reserved",
      "foodDrink":"Ăn uống",
      "Restaurant":"Nhà hàng",
      "Installment":"Trả góp",
      "Property":"Tài sản",
      "More":"Xem thêm",
      "addWallet":"Tạo ví mới",
      "":"",
      "nameWallet":"Tên ví",
      "moneyHave":"Tiền hiện có",
      "typeMoney":"Loại tiền tệ",
      "aboutWallet":"Mô tả ví",
      "chooseMoneyType":"Chọn một loại tiền tệ",
      "cancel":"Hủy",
      "update":"Cập nhật",
      "newWallet":"Tạo mới",
      "deleteWallet":"Xóa ví tiền",
      "listUserShareWallet":"Danh sách người chia sẻ của ví",
      "addUserShareWallet":"Thêm người được chia sẻ ví",
      "role":"Vai trò:",
      "userName":"UserName:",
      "email":"Email:",
      "deleteShare":"Xóa liên kết",
      "shareWallet":"Chia sẻ ví",
      "typeMailUser":"Nhập mail của người dùng",
      "add":"Thêm",
      "iconWallet":"icon ví",
      "all":"Tất cả",
      "revenue":"Thu",
      "expenditure":"Chi",
      "addTransaction":"Thêm Giao Dịch",
      "edit":"Sửa",
      "delete":"Xóa",
      "confirmDeleteTrans":"Bạn có chắc chắn muốn xóa giao dịch này không?",
      "pay":"Chuyển tiền",
      "walletIn":"Ví chuyển tiền",
      "walletOut":"Ví nhận tiền ",
      "addCategory":"Tạo phân loại mới",
      "chooseCategory":"Chọn một loại phân loại",
      "title": " Tiền không phải là tất cả, nhưng nó là một phần quan trọng trong cuộc sống của chúng ta."
    }
  },
  kr: {
    translation: {
      "transaction": "거래",
      "description": "이것은 간단한 설명입니다",
      "wallet": "지갑",
      "dashboard": "대시보드",
      "budget": "예산",
      "category": "카테고리",
      "report": "보고서",
      "profile": "프로필",
      "setting": "설정"
    }
  },
  cn: {
    translation: {
      "transaction": "交易",
      "description": "这是一个简单的描述",
      "wallet": "钱包",
      "dashboard": "仪表板",
      "budget": "预算",
      "category": "类别",
      "report": "报告",
      "profile": "个人资料",
      "setting": "设置"
    }
  }
};

const savedLanguage = localStorage.getItem('language') || 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
