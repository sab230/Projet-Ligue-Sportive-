import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { useLocation } from "wouter";

export default function Login() {
    const [l, navigate] = useLocation();

    const auth = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        const fetching = await fetch('http://localhost:8081/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (fetching.ok) {
            const { id, token } = await fetching.json();
            auth.login({
                token, userId: id
            });
            console.log(l);
            navigate('/');
        }
    }

    return (
        <div>
            <h1>Connexion</h1>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Email</label>
                </div>
                <div className="col-auto">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" />
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Mot de passe</label>
                </div>
                <div className="col-auto">
                    <input onChange={e => setPassword(e.target.value)} type="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" />
                </div>
            </div>

            <button onClick={onLogin} className="btn btn-primary">Se connecter</button>
        </div>
    )
}