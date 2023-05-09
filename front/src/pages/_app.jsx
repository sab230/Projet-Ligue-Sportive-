import { Route } from "wouter";
import Index from ".";
import CartPage from "./cart";
import Login from "./login";
const App = () => (
    <div>
        <Route path="/">
            <Index />
        </Route>

        <Route path="/cart">
            <CartPage />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
    </div>
);

export default App;