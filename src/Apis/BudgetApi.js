import axiosInstance from "./axiosInstance";

class BudgetApi {
    static getAll() {
        return axiosInstance.get('/api/v1/budgets');
    }

    static async deleteBudget(id) {
            return axiosInstance.delete('/api/v1/budgets/' + id);
    }

    static async createBudget(data) {
        return axiosInstance.post('/api/v1/budgets', data);

    }
}

export default BudgetApi;