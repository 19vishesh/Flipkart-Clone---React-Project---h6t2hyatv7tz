import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiProductData } from '../App';
import { useContext, useEffect, useState } from "react";

import productData from "../data/allProductData";

// export const fetchApiData = createAsyncThunk('fetchDatas', async () => {
//     const response = await fetch("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products");
//     return response.json();
// });

//Getting cartdata form localstorage
const getLocalCartData = () => {
    if (localStorage.getItem("shoppingCart") === null || localStorage.getItem("shoppingCart") !== []) {
        return [];
    }
    const localData = localStorage.getItem("shoppingCart");
    if (localData === [])
        return [];
    else
        return JSON.parse(localData);
}


const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    item: productData,
    totalQuantity: 0,
    totalPrice: 0,
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const find = state.cart.findIndex((item) => item.id === action.payload.id);
            if (find >= 0)
                state.cart[find].quantity += 1;
            else
                state.cart.push(action.payload);
        },
        getCartTotal: (state) => {
            let { totalQuantity, totalPrice } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    // console.log("carttotal", cartTotal);
                    // console.log("cartitem", cartItem);
                    const { price, quantity } = cartItem;
                    // console.log(price, quantity);
                    const itemTotal = price * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += quantity;
                    return cartTotal;
                },
                {
                    totalPrice: 0,
                    totalQuantity: 0,
                }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        increaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        },
        decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    if (item.quantity > 1)
                        return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        },

    },
})

export const { addToCart, getCartTotal, removeItem, increaseItemQuantity, decreaseItemQuantity
} = cartSlice.actions;
export default cartSlice.reducer;