import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "./book.service";
import { AddBook, AddBookFailure, AddBookSuccess } from "./book.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class BookEffects {
    //This is an ngRx effect that responds to 'AddBook' actions
    addBook$ = createEffect(() => 
        this.actions$.pipe(
            //Listen for actions of type 'AddBook'
            ofType(AddBook),
            //For each 'AddBook' action, call 'addbook' on the book service
            //mergeMap allows multiple concurrent 'addBook' calls
            mergeMap((action) => this.bookService.addBook(action).pipe(
                //If the 'addBook' call is successful, dispatch 'AddBookSuccess' action with the book data
                map(book => AddBookSuccess(book)),
                //If the 'addBook' call fails, dispatch 'AddBookFailure' action with the error
                catchError((error) => of(AddBookFailure({error})))
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private bookService: BookService
    ) {}


}