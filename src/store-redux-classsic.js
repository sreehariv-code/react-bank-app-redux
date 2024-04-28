//Classic Redux Method. Learning purposes only
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducter = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducter,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
