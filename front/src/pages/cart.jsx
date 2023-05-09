import { useContext } from 'react';

import { CartContext } from '../contexts/cart-context';
import { AuthContext } from '../contexts/auth-context';
import { useLocation } from "wouter";

export default function CartPage() {
    const { cart, clearCart } = useContext(CartContext);
    const auth = useContext(AuthContext);
    const [l, navigate] = useLocation();

    const isLogged = auth.isLogged();

    const validateOrder = async () => {
        if (!isLogged) {
            alert("Vous devez vous connecter pour valider votre commande");
            return;
        }

        const response = await fetch('http://localhost:8081/commande', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.size?.length || item.quantity,
                }))
            })
        });

        if (response.ok) {

            alert("Votre commande a été validée");
            clearCart()
            console.log(l);
            navigate('/');
        }
    }
    return (
        <div className="border border-dark p-2">
            <div className="d-flex flex-column justify-content-center">
                <h1 className="text-center">Mon panier</h1>
                <div className="mt-5">
                    <ul className="list-group">
                        {
                            cart.map((item) => (
                                <li className="list-group-item" key={item.id}>
                                    <div className="d-flex align-items-center">
                                        {
                                            (item.quantity && !item.size) && (
                                                <div className="flat-start">
                                                    <span className="badge bg-secondary">{item.quantity}</span>
                                                </div>
                                            )
                                        }
                                        <img
                                            src={item.image}
                                            alt="Image 1"
                                            className="mr-3"
                                            width={50}
                                            height={50}
                                        />
                                        <div>
                                            {item.name} {" "}
                                            <span className="badge text-bg-primary ml-2">{item.brand}</span>
                                        </div>

                                        {
                                            item.size && (
                                                <div className="float-end mx-auto">
                                                    {
                                                        item.size.map((size, i) => (
                                                            <span key={`${size}_${i}`} className="badge bg-secondary">{size}</span>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="mt-5 text-center">
                    <button onClick={validateOrder} className="btn btn-success">Valider mon panier</button>
                </div>
            </div>
        </div>
    )
}