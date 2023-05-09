import { useContext, useMemo } from "react";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import { useLocation } from "wouter";

import { Link } from "wouter";
export default function Navbar() {

    const auth = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    // eslint-disable-next-line no-unused-vars
    const [_, navigate] = useLocation();

    const cartCount = useMemo(() => cart.reduce((acc, item) => {
        if (item.size) {
            return acc + item.size.length;
        }
        return acc + item.quantity;
    }, 0), [cart]);

    const isLogged = auth.isLogged();


    const logout = () => {
        auth.logout();
        navigate('/');
    }

    return (
        <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Ligue Sportive</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Accueil</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {isLogged ? (
                            <span className="nav-link" aria-current="page" onClick={() => logout()} >Se déconnecter</span>
                        ) : (
                            <Link className="nav-link" aria-current="page" href="/login">Se connecter</Link>
                        )}
                    </div>

                </div>
            </div>

            <div className="float-end">
                <Link className="nav-link" href="/cart">Panier
                    <span className="badge bg-secondary">{cartCount}</span>
                </Link>
            </div>
        </nav>
    )
}