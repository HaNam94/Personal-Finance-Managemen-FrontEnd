// categorySlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CategoryApi from "../../Apis/CategoryApi";

const initialState = {
    categories: [],
    allCategories: [],
    incomeCategories: [],
    outcomeCategories: [],
    status: 'idle',
};


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (token) => {
    const res= await CategoryApi.getAll();
    const categories = res.data;

    const allCategories = categories.flatMap(category => [
        {
            ...category,
            subCategories: undefined
        },
        ...category.subCategories.map(subCategory => ({
            ...subCategory,
        }))
    ]);

    console.log(allCategories);
    const outcomeCategories = allCategories.filter((e) => e.categoryType === 0);
    const incomeCategories = allCategories.filter((e) => e.categoryType === 1);
    return {categories, incomeCategories, outcomeCategories, allCategories};
});
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },   extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload.categories;
                state.incomeCategories = action.payload.incomeCategories;
                state.outcomeCategories = action.payload.outcomeCategories;
                state.allCategories = action.payload.allCategories;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});
export default categorySlice.reducer;