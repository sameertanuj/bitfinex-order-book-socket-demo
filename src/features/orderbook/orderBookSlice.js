import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderBookData: [],
    askData: [],
    bidData: []
};

export const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addData: (state, action) => {
            state.orderBookData.push(action.payload);
        },
        addBidData: (state, action) => {
            state.bidData.push(action.payload);
        },
        addAskData: (state, action) => {
            state.askData.push(action.payload);
        },
        clearData: (state) => {
            state.orderBookData = [];
            state.askData = [];
            state.bidData = [];
        },
    },
});

export const { addData, addBidData, addAskData, clearData } = orderBookSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrderBook = (state) => state.orderBook;


export default orderBookSlice.reducer;
