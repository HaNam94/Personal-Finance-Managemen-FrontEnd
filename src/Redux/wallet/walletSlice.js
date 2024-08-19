// walletSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import WalletApi from "../../Apis/WalletApi";

const initialState = {
  selectedWalletId: null,
  wallets: [],
  ownerWallets: [],
  status: 'idle',
  selectedWallet: null
};


// Fetch all wallets
export const fetchWallets = createAsyncThunk(
    'wallets/fetchWallets',
    async (_, { getState }) => {
      const response = await WalletApi.getAll();
      const wallets = response.data;

      // Get userId from the state
      const { user } = getState().auth;
      const userId = user?.id;

      // Filter wallets where the user is an "OWNER"
      const ownerWallets = wallets.filter(wallet =>
          wallet.walletRoles.some(role => role.userId === userId && role.role === 'OWNER')
      );

      return { wallets, ownerWallets };
    }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setSelectedWalletId: (state, action) => {
      state.selectedWalletId = action.payload;
    },
    setSelectedWallet: (state, action) => {
      state.selectedWallet = action.payload;
    },
  },   extraReducers: (builder) => {
  builder
      .addCase(fetchWallets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wallets = action.payload.wallets;
        state.ownerWallets = action.payload.ownerWallets;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const { setSelectedWalletId, setSelectedWallet } = walletSlice.actions;
export default walletSlice.reducer;