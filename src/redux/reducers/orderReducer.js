const orderReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDER_BOOOKS":
      return action.payload;

    default:
      return state;
  }
};

export default orderReducer;
