import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Category, Product } from '../../types/Item';
import { callApi } from '../../utils/api/callApi';
import { useSelector } from 'react-redux';


// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'cart/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await callApi('api/order/categories'); // categories;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Async thunk for create Order
export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (products: Product[], { rejectWithValue }) => {
    try {
      return await callApi('api/order/create', 'POST', products);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'שגיאה לא ידועה');
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    categories: [],
    isLoading: false,
    isError: null,
    orderId: null
  } as CartState,

  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { name, categoryId, quantity, categoryName } = action.payload;
      const existingProduct = state.products.find(p => p.name === name && p.categoryId === categoryId);
      
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({
          // id: Date.now().toString(),
          name,
          categoryId,
          quantity: quantity || 1, 
          categoryName
        });
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      }).addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        // state.orderId = action.payload.id;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { addProduct, clearCart } = cartSlice.actions;
function dispatch(arg0: { payload: undefined; type: "cart/clearCart"; }) {
  throw new Error('Function not implemented.');
}

