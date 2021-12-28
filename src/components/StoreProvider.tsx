import { TokenStore } from "../store";
import StoreContext from "../context/authContext";

const StoreProvider: React.FC<{
    store: TokenStore;
}> = ({ store, children }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export default StoreProvider;
