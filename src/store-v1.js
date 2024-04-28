//Classic Redux Method. Learning purposes only
import { combineReducers, createStore } from "redux";

//Initial States for reducers
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//Create Reducer function
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    //In useReducer, we used to throw an error as if action type is not found.
    //In redux, it is advised to return the state
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducter = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducter);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 100 });

// console.log("Withdraw: ", store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log("Request Loan: ", store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log("Pay Loan: ", store.getState());

//Create action creators (optional: convention followed in Redux)

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

//Customer action creators
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      //We can compute date in reducer, but it would be a side effect.
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

// store.dispatch(deposit(1000));
// store.dispatch(withdraw(200));
// store.dispatch(requestLoan(5000, "Buy a mortage"));
// store.dispatch(payLoan());
// console.log(store.getState());

store.dispatch(createCustomer("Tarun Raj", "6789"));
console.log(store.getState());
