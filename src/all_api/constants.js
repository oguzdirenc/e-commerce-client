const rootUrl = "http://localhost:8080";

const bookUrl = "/api/book";

export const getAllBooksUrl = rootUrl + bookUrl + "/all";

export const saveBookUrl = rootUrl + bookUrl + "/save";

export const updateBookUrl = rootUrl + bookUrl + "/update";

const categoryUrl = rootUrl + "/api/category";

export const categoryToBookUrl = categoryUrl + "/setCategory";

const authorUrl = rootUrl + "/api/author";

export const putAuthorToBookUrl = authorUrl + "/book";
