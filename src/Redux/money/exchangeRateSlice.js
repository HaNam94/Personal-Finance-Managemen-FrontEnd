// exchangeRateSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    exchangeRates: [],
    status: 'idle',
    error: null,
};

// Fetch exchange rates from Vietcombank
export const fetchExchangeRates = createAsyncThunk(
    'exchangeRates/fetchExchangeRates',
    async () => {
        const response = await fetch('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const exrateList = Array.from(xmlDoc.getElementsByTagName('Exrate')).map((exrate) => ({
            currencyCode: exrate.getAttribute('CurrencyCode'),
            currencyName: exrate.getAttribute('CurrencyName'),
            buy: exrate.getAttribute('Buy'),
            transfer: exrate.getAttribute('Transfer'),
            sell: exrate.getAttribute('Sell'),
        }));
        return exrateList;
    }
);

// Create a slice for exchange rates
const exchangeRateSlice = createSlice({
    name: 'exchangeRates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRates.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExchangeRates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exchangeRates = action.payload;
            })
            .addCase(fetchExchangeRates.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default exchangeRateSlice.reducer;
