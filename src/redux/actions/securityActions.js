export const login = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};
