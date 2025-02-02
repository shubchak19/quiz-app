import store from "@/redux/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";
type RootStateType = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;