import {catchError, map, Observable, of, startWith} from "rxjs";
import {isSuccess, LoadState$, LoadStateType} from "./load-state.types";

export const wrap = <T = unknown>(obs$: Observable<T>): LoadState$<T> => obs$.pipe(
  map(value => ({type: LoadStateType.SUCCESS, value})),
  startWith({type: LoadStateType.LOADING}),
  catchError(error => of({type: LoadStateType.ERROR, error}))
)


export const mapOnSuccess = <T = unknown, G = unknown>(mapFn: (item: T) => G) => (obs$: LoadState$<T>): LoadState$<T | G> => {
  return obs$.pipe(
    map(result => {
      if (isSuccess(result)) {
        return { type: result.type, value: mapFn(result.value) };
      }
      return result;
    })
  );
}
