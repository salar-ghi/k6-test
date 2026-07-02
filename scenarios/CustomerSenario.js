import { sleep } from "k6";
import { login } from "../flows/auth.flow.js";
import { CustomerUserFlow } from "../flows/customerUser.flow.js";
import { customerUser, SellerUser } from "../config/User.js";
import { GenerateSummery } from "../utils/Report.js";
import { TestOption } from "../config/option.js";
 

export const options = TestOption; 
export function setup() {
   return {
      token: login(customerUser)
   };
}
export default function(data) {
 
  CustomerUserFlow(data.token);
  sleep(1);
}
export function handleSummary(data) {
  return  GenerateSummery(data)  ;
}