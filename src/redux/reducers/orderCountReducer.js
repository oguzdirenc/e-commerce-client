const orderCountReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDER_COUNTS":
      return action.payload;

    default:
      return state;
  }
};

export default orderCountReducer;
