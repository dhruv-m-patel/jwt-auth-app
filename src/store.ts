import { useContext } from "react";
import StoreProvider from "./components/StoreProvider";
import StoreContext, { TokenStore } from "./context/authContext";

const useStore = () => useContext(StoreContext);

export { TokenStore, StoreProvider, useStore };
