const initialState = 0;
let orderCount = 0;
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_ORDER":
      orderCount += action.payload;
      return orderCount;

    default:
      return state;
  }
};

export default orderReducer;
