import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "wallet": "Wallet",
      "transaction": "Transaction",
      "budget": "Budget",
      "category": "Category",
      "report": "Report",
      "profile": "Profile",
      "setting": "Setting",
      "totalBalance": "Total Balance",
      "percentageChange": "compared to last week",
      "totalTransactions": "Total Transactions",
      "totalIncome": "Total Income",
      "totalExpense": "Total Expense",
      "recentTransactions": "Recent Transactions",
      "lastFiveTransactions": "Last 5 transactions",
      "overviewWallet": "Wallet Overview",
      "percentComplete": "Percent Complete",
      "transactionDetails": "Transaction Details",
      "developedBy": "Copyright © Designed & Developed by C02 Codegym HN x ĐN 2024",
      "currentMonth": "This month",
      "increase": "+",
      "decrease": "-",
      "time": "Time",
      "amount": "Amount",
      "currencyUnit": "đ",
      "addIncome": "Add Income",
      "addExpense": "Add Expense",
      "transferMoney": "Transfer Money",
      "note": "Note",
      "transactionDate": "Transaction Date",
      "transactionType": "Transaction Type",
      "selectOption": "Select...",
      "categoryType": "Category Type",
      "categoryName": "Category Name",
      "categoryIcon": "Category Icon",
      "fullName": "Full Name",
      "phoneNumber": "Phone Number",
      "dob": "Date of Birth",
      "freeAccount": "Free Account, Upgrade Now!",
      "titleTabBar": "Financial Management App",
      "minides": "© 2024 All Rights Reserved",
      "foodDrink": "Food & Drink",
      "Restaurant": "Restaurant",
      "Installment": "Installment",
      "Property": "Property",
      "More": "More",
      "addWallet": "Add New Wallet",
      "nameWallet": "Wallet Name",
      "moneyHave": "Available Balance",
      "typeMoney": "Currency Type",
      "aboutWallet": "Wallet Description",
      "chooseMoneyType": "Choose a Currency Type",
      "cancel": "Cancel",
      "update": "Update",
      "newWallet": "Create New",
      "deleteWallet": "Delete Wallet",
      "listUserShareWallet": "Shared Wallet Users",
      "addUserShareWallet": "Add Wallet Share User",
      "role": "Role:",
      "userName": "UserName:",
      "email": "Email:",
      "deleteShare": "Remove Share",
      "shareWallet": "Share Wallet",
      "typeMailUser": "Enter user's email",
      "add": "Add",
      "iconWallet": "Wallet Icon",
      "all": "All",
      "revenue": "Revenue",
      "expenditure": "Expenditure",
      "addTransaction": "Add Transaction",
      "edit": "Edit",
      "delete": "Delete",
      "confirmDeleteTrans": "Are you sure you want to delete this transaction?",
      "pay": "Transfer Money",
      "walletIn": "Source Wallet",
      "walletOut": "Destination Wallet",
      "addCategory": "Add New Category",
      "chooseCategory": "Choose a Category",
      "listTransaction": "Transaction List",
      "childItem": "Sub-item",
      "childItemNotFound": "No sub-items found",
      "addChildItem": "Add Sub-item",
      "updatePremium": "Upgrade to Premium",
      "blabla": "Only 500k for unlimited wallets, transactions, no ads, and 24/7 support.",
      "updateNow": "Upgrade Now",
      "changePassword": "Change Password",
      "nowPass": "Current Password",
      "newPass": "New Password",
      "confirmPass": "Confirm Password",
      "deleteAccount": "Delete Account",
      "confirmDelete1": "Are you sure you want to delete your account?",
      "confirmDelete2": "All related data will be deleted and cannot be recovered!",
      "formartDate": "Date Format",
      "formartMoney": "Money Display Format",
      "confirmLogout": "Confirm Logout",
      "logout": "Logout",
      "title": "Money is not everything, but it is an important part of our lives.",
      "addNewBudget": "Add New Budget",
      "amountMoney": "Amount Money",
      "day": "Day",
      "synthetic": "Synthetic",
      "spent": "Spent",
      "endMonth": "End of Month",
      "confirmDeleteBudget": "Are you sure you want to delete this budget?",
      "remaining": "Remaining",
      "nameBudget": "Budget Name",
      "chooseType": "Choose Category",
      "describe": "Describe",
      "storage": "Store wallet",
      "restore": "Restore wallet",
      "youWant": "Are you sure you want to",
      "walletin": " this wallet?",
      "export": "Export",
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
      "phoneNumber": "Số điện thoại",
      "dob": "Ngày sinh",
      "freeAccount": "Tài khoản miễn phí nâng cấp ngay!",
      "titleTabBar": "Ứng dụng quản lý tài chính",
      "minides": "© 2024 All Rights Reserved",
      "foodDrink": "Ăn uống",
      "Restaurant": "Nhà hàng",
      "Installment": "Trả góp",
      "Property": "Tài sản",
      "More": "Xem thêm",
      "addWallet": "Tạo ví mới",
      "nameWallet": "Tên ví",
      "moneyHave": "Tiền hiện có",
      "typeMoney": "Loại tiền tệ",
      "aboutWallet": "Mô tả ví",
      "chooseMoneyType": "Chọn một loại tiền tệ",
      "cancel": "Hủy",
      "update": "Cập nhật",
      "newWallet": "Tạo mới",
      "deleteWallet": "Xóa ví tiền",
      "listUserShareWallet": "Danh sách người chia sẻ của ví",
      "addUserShareWallet": "Thêm người được chia sẻ ví",
      "role": "Vai trò:",
      "userName": "UserName:",
      "email": "Email:",
      "deleteShare": "Xóa liên kết",
      "shareWallet": "Chia sẻ ví",
      "typeMailUser": "Nhập mail của người dùng",
      "add": "Thêm",
      "iconWallet": "icon ví",
      "all": "Tất cả",
      "revenue": "Thu",
      "expenditure": "Chi",
      "addTransaction": "Thêm",
      "edit": "Sửa",
      "delete": "Xóa",
      "confirmDeleteTrans": "Bạn có chắc chắn muốn xóa giao dịch này không?",
      "pay": "Chuyển tiền",
      "walletIn": "Ví chuyển tiền",
      "walletOut": "Ví nhận tiền ",
      "addCategory": "Tạo phân loại mới",
      "chooseCategory": "Chọn một loại phân loại",
      "listTransaction": "Danh sách giao dịch",
      "childItem": "Mục con",
      "childItemNotFound": "Không có mục con",
      "addChildItem": "Tạo mục con",
      "updatePremium": "Nâng Cấp Lên Premium",
      "blabla": "Chỉ 500k không giới hạn số lượng ví, giao dịch, không còn quảng cáo và được hỗ trợ 24/24.",
      "updateNow": "Nâng cấp ngay",
      "changePassword": "Thay đổi mật khẩu",
      "nowPass": "Mật khẩu hiện tại",
      "newPass": "Mật khẩu mới",
      "confirmPass": "Xác nhận mật khẩu",
      "deleteAccount": "Xóa tài khoản",
      "confirmDelete1": "Bạn có chắc chắn muốn xóa tài khoản không?",
      "confirmDelete2": "Tất cả dữ liệu liên quan sẽ bị xóa, không thể khôi phục lại!",
      "formartDate": "Định dạng ngày",
      "formartMoney": "Định dạng hiển thị tiền",
      "confirmLogout": "Xác Nhận Đăng Xuất",
      "logout": "Đăng Xuất",
      "title": "Tiền không phải là tất cả, nhưng nó là một phần quan trọng trong cuộc sống của chúng ta.",
      "addNewBudget": "Tạo budget mới",
      "amountMoney": "Số tiền có thể chi",
      "day": "ngày",
      "synthetic": "Tổng",
      "spent": "Đã chi",
      "endMonth": "Cuối tháng",
      "confirmDeleteBudget": "Bạn có chắc chắn muốn ngân sách ",
      "remaining": "Còn lại",
      "nameBudget": "Tên ngân sách",
      "chooseType": "Chọn Phân Loại",
      "describe": "mô tả",
      "storage": "Lưu trữ ví",
      "restore": "Khôi phục ví",
      "youWant": "Bạn có chắc chắn muốn",
      "walletin": " ví này không?",
      "export": "Xuất",
    }
  },
  kr: {
    translation: {
      "dashboard": "대시보드",
      "wallet": "지갑",
      "transaction": "거래",
      "budget": "예산",
      "category": "카테고리",
      "report": "보고서",
      "profile": "프로필",
      "setting": "설정",
      "totalBalance": "총 잔액",
      "percentageChange": "지난 주 대비",
      "totalTransactions": "총 거래 수",
      "totalIncome": "총 수입",
      "totalExpense": "총 지출",
      "recentTransactions": "최근 거래",
      "lastFiveTransactions": "최근 5개 거래",
      "overviewWallet": "지갑 개요",
      "percentComplete": "완료율",
      "transactionDetails": "거래 세부사항",
      "developedBy": "저작권 © 2024 C02 Codegym HN x ĐN 설계 및 개발",
      "currentMonth": "이번 달",
      "increase": "+",
      "decrease": "-",
      "time": "시간",
      "amount": "금액",
      "currencyUnit": "đ",
      "addIncome": "수입 추가",
      "addExpense": "지출 추가",
      "transferMoney": "송금",
      "note": "노트",
      "transactionDate": "거래 날짜",
      "transactionType": "거래 유형",
      "selectOption": "선택...",
      "categoryType": "카테고리 유형",
      "categoryName": "카테고리 이름",
      "categoryIcon": "카테고리 아이콘",
      "fullName": "이름",
      "phoneNumber": "전화번호",
      "dob": "생년월일",
      "freeAccount": "무료 계정, 지금 업그레이드하세요!",
      "titleTabBar": "재정 관리 앱",
      "minides": "© 2024 모든 권리 보유.",
      "foodDrink": "음식 및 음료",
      "Restaurant": "레스토랑",
      "Installment": "할부",
      "Property": "재산",
      "More": "더보기",
      "addWallet": "새 지갑 추가",
      "nameWallet": "지갑 이름",
      "moneyHave": "가용 잔액",
      "typeMoney": "통화 유형",
      "aboutWallet": "지갑 설명",
      "chooseMoneyType": "통화 유형 선택",
      "cancel": "취소",
      "update": "업데이트",
      "newWallet": "새로 만들기",
      "deleteWallet": "지갑 삭제",
      "listUserShareWallet": "공유 지갑 사용자",
      "addUserShareWallet": "공유 지갑 사용자 추가",
      "role": "역할:",
      "userName": "사용자 이름:",
      "email": "이메일:",
      "deleteShare": "공유 삭제",
      "shareWallet": "지갑 공유",
      "typeMailUser": "사용자 이메일 입력",
      "add": "추가",
      "iconWallet": "지갑 아이콘",
      "all": "전체",
      "revenue": "수입",
      "expenditure": "지출",
      "addTransaction": "거래 추가",
      "edit": "편집",
      "delete": "삭제",
      "confirmDeleteTrans": "이 거래를 삭제하시겠습니까?",
      "pay": "송금",
      "walletIn": "송금 지갑",
      "walletOut": "수신 지갑",
      "addCategory": "새 카테고리 추가",
      "chooseCategory": "카테고리 선택",
      "listTransaction": "거래 목록",
      "childItem": "하위 항목",
      "childItemNotFound": "하위 항목이 없습니다",
      "addChildItem": "하위 항목 추가",
      "updatePremium": "프리미엄으로 업그레이드",
      "blabla": "월 500k로 무제한 지갑, 거래, 광고 없음, 24/7 지원을 받으세요.",
      "updateNow": "지금 업그레이드",
      "changePassword": "비밀번호 변경",
      "nowPass": "현재 비밀번호",
      "newPass": "새 비밀번호",
      "confirmPass": "비밀번호 확인",
      "deleteAccount": "계정 삭제",
      "confirmDelete1": "계정을 삭제하시겠습니까?",
      "confirmDelete2": "관련된 모든 데이터가 삭제되며 복구할 수 없습니다!",
      "formartDate": "날짜 형식",
      "formartMoney": "화폐 형식",
      "confirmLogout": "로그아웃 확인",
      "logout": "로그아웃",
      "title": "돈은 전부가 아니지만, 우리 삶의 중요한 부분입니다.",
      "addNewBudget": "새 예산 추가",
      "amountMoney": "금액",
      "day": "일",
      "synthetic": "합성",
      "spent": "지출됨",
      "endMonth": "월말",
      "confirmDeleteBudget": "이 예산을 삭제하시겠습니까?",
      "remaining": "남은 금액",
      "nameBudget": "예산 이름",
      "chooseType": "카테고리 선택",
      "describe": "설명",
      "storage": "지갑 저장",
      "restore": "지갑 복원",
      "youWant": "정말로 하시겠습니까",
      "walletin": " 이 지갑?",
      "export": "내보내기"
    }
  },
  cn: {
    translation: {
      "dashboard": "仪表板",
      "wallet": "钱包",
      "transaction": "交易",
      "budget": "预算",
      "category": "类别",
      "report": "报告",
      "profile": "个人资料",
      "setting": "设置",
      "totalBalance": "总余额",
      "percentageChange": "与上周相比",
      "totalTransactions": "总交易数",
      "totalIncome": "总收入",
      "totalExpense": "总支出",
      "recentTransactions": "最近交易",
      "lastFiveTransactions": "最近5笔交易",
      "overviewWallet": "钱包概览",
      "percentComplete": "完成百分比",
      "transactionDetails": "交易详情",
      "developedBy": "版权所有 © 2024 由C02 Codegym HN x ĐN设计开发",
      "currentMonth": "本月",
      "increase": "+",
      "decrease": "-",
      "time": "时间",
      "amount": "金额",
      "currencyUnit": "đ",
      "addIncome": "添加收入",
      "addExpense": "添加支出",
      "transferMoney": "转账",
      "note": "备注",
      "transactionDate": "交易日期",
      "transactionType": "交易类型",
      "selectOption": "选择...",
      "categoryType": "类别类型",
      "categoryName": "类别名称",
      "categoryIcon": "类别图标",
      "fullName": "姓名",
      "phoneNumber": "电话号码",
      "dob": "出生日期",
      "freeAccount": "免费账户，立即升级！",
      "titleTabBar": "财务管理应用",
      "minides": "© 2024 保留所有权利。",
      "foodDrink": "饮食",
      "Restaurant": "餐厅",
      "Installment": "分期付款",
      "Property": "财产",
      "More": "更多",
      "addWallet": "添加新钱包",
      "nameWallet": "钱包名称",
      "moneyHave": "可用余额",
      "typeMoney": "货币类型",
      "aboutWallet": "钱包描述",
      "chooseMoneyType": "选择一种货币类型",
      "cancel": "取消",
      "update": "更新",
      "newWallet": "新建",
      "deleteWallet": "删除钱包",
      "listUserShareWallet": "共享钱包用户",
      "addUserShareWallet": "添加共享钱包用户",
      "role": "角色：",
      "userName": "用户名：",
      "email": "电子邮件：",
      "deleteShare": "删除共享",
      "shareWallet": "分享钱包",
      "typeMailUser": "输入用户的电子邮件",
      "add": "添加",
      "iconWallet": "钱包图标",
      "all": "全部",
      "revenue": "收入",
      "expenditure": "支出",
      "addTransaction": "添加交易",
      "edit": "编辑",
      "delete": "删除",
      "confirmDeleteTrans": "您确定要删除此交易吗？",
      "pay": "转账",
      "walletIn": "付款钱包",
      "walletOut": "收款钱包",
      "addCategory": "添加新类别",
      "chooseCategory": "选择一个类别",
      "listTransaction": "交易列表",
      "childItem": "子项",
      "childItemNotFound": "未找到子项",
      "addChildItem": "添加子项",
      "updatePremium": "升级到高级版",
      "blabla": "仅需500k，享受无限钱包，交易，无广告，24/7支持。",
      "updateNow": "立即升级",
      "changePassword": "更改密码",
      "nowPass": "当前密码",
      "newPass": "新密码",
      "confirmPass": "确认密码",
      "deleteAccount": "删除账户",
      "confirmDelete1": "您确定要删除账户吗？",
      "confirmDelete2": "所有相关数据将被删除，无法恢复！",
      "formartDate": "日期格式",
      "formartMoney": "货币显示格式",
      "confirmLogout": "确认退出登录",
      "logout": "退出登录",
      "title": "金钱不是一切，但它是我们生活的重要组成部分。",
      "addNewBudget": "新增预算",
      "amountMoney": "金额",
      "day": "日",
      "synthetic": "综合",
      "spent": "已花费",
      "endMonth": "月底",
      "confirmDeleteBudget": "您确定要删除此预算吗？",
      "remaining": "剩余金额",
      "nameBudget": "预算名称",
      "chooseType": "选择类别",
      "describe": "描述",
      "storage": "存储钱包",
      "restore": "恢复钱包",
      "youWant": "您确定要",
      "walletin": " 这个钱包吗？",
      "export": "导出"
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
