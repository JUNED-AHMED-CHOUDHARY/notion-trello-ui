import { PersistConfig } from "redux-persist";
import { RootState } from "./store";
import localStorage from "redux-persist/lib/storage";


export const rootPersistConfig : PersistConfig<RootState> = {
    key: "root",
    storage: localStorage,
}