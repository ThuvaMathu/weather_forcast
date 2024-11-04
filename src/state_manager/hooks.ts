import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { type RootState, type AppDispatch, store } from "./store";
import { Dispatch } from "redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const topLevelDispatch = (): Dispatch => {
  return store.dispatch;
};
