import {Observable} from "rxjs";

export enum LoadStateType {
  LOADING,
  SUCCESS,
  ERROR
}

export type LoadState<T, E = unknown> = {
  type: LoadStateType,
  value?: T,
  error?: E
};


export type LoadStateSucess<T = undefined> = {
  type: LoadStateType.SUCCESS,
  value: T,
}

export type LoadStateError<T = unknown, E = unknown> =  {
  type: LoadStateType.ERROR,
  error: E
}

export type LoadStateLoading<T = unknown> = {
  type: LoadStateType.LOADING,
};


export type LoadState$<T> = Observable<LoadState<T>>

export type LoadStateSucess$<T = undefined> = Observable<LoadStateSucess<T>>

export type LoadStateError$<T = unknown> = Observable<LoadStateError<T>>;

export type LoadStateLoading$<T = unknown> = Observable<LoadStateLoading<T>>;



export const isSuccess = <T = any>(state: LoadState<T>): state is LoadStateSucess<T> => {
  return (state.type === LoadStateType.SUCCESS);
}

export const isError = <T = any>(state: LoadState<T>): state is LoadStateError<T> => {
  return (state.type === LoadStateType.ERROR);
}

export const isLoading = <T = any>(state: LoadState<T>): state is LoadStateLoading<T> => {
  return (state.type === LoadStateType.LOADING);
};
