import { createReducer, on } from "@ngrx/store";
import { AddBook, AddBookFailure, AddBookSuccess, RemoveBook } from "./book.action";
import { Book } from "../models/book";

export const initialState: Book[] = [];

export const bookReducer = createReducer(
    initialState,
    //Add book should not change the state as we are not sure it is success or failure
    on(AddBook, (state) => {return state}),
    on(AddBookSuccess, (state, { id, title, author }) => [...state, {id, title, author}]),
    on(AddBookFailure, (state, { error }) => {
        console.error(error);
        return state;
    }),
    on(RemoveBook, (state, {bookId}) => [...state.filter(book => book.id !== bookId)])
);