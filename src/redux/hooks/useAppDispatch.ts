import store from "@/redux/store";
import { useDispatch } from "react-redux";
type AppDispatchType = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();