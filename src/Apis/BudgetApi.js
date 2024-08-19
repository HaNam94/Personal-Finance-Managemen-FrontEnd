import axiosInstance from "./axiosInstance";

class BudgetApi {
    static getAll() {
        return axiosInstance.get('/api/v1/budgets');
    }

}

export default BudgetApi;