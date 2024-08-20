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

    static async getBudgetById(budgetId) {
        return axiosInstance.get('/api/v1/budgets/' + budgetId);
    }

    static async updateBudget(data, budgetId) {
        return axiosInstance.put('/api/v1/budgets/' + budgetId , data);
    }
}

export default BudgetApi;