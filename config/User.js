import { ENV } from "../config/env.js";
export const customerUser = {
    username: ENV.Customer_UserName,
    password: ENV.Customer_PassWord,
};

export const SellerUser = {
    username: ENV.Seller_UserName,
    password: ENV.Seller_PassWord,
};  