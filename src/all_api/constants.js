const rootUrl = "http://localhost:8080";

const bookUrl = rootUrl + "/api/book";
export const getAllBooksUrl = bookUrl + "/all";
export const saveBookUrl = bookUrl + "/save";
export const updateBookUrl = bookUrl + "/update";
//export const addToShoppingCartUrl = bookUrl + "/order";
export const setBookOrderUrl = bookUrl + "/setOrder";
export const deleteBookOrderUrl = bookUrl + "/delete/order";
export const deleteBookUrl = bookUrl + "/delete";

const categoryUrl = rootUrl + "/api/category";
export const categoryToBookUrl = categoryUrl + "/setCategory";

const authorUrl = rootUrl + "/api/author";
export const putAuthorToBookUrl = authorUrl + "/book";

const shoppingCartUrl = rootUrl + "/api/shoppingCart";
export const shoppingCartBooksUrl = shoppingCartUrl + "/books";
export const addToShoppingCartUrl = shoppingCartUrl + "/addBook";
export const decreaseBookOrderUrl = shoppingCartUrl + "/removeBook";
export const totalPriceUrl = shoppingCartUrl + "/totalPrice";

const userUrl = rootUrl + "/api/users";
export const userRegisterUrl = userUrl + "/register";
export const userLoginUrl = userUrl + "/login";
