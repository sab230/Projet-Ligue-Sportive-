import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
    token: null,
    userId: null,
    login: () => { },
    logout: () => { },
    isLogged: () => { }
});

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const { token: storedToken, userId: storedUserId } = JSON.parse(storedData);
            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, []);

    const loginHandler = ({ token, userId }) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('userData', JSON.stringify({ token, userId }));
    };

    const logoutHandler = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    };

    const isLogged = () => {
        return !!token;
    }

    return (
        <AuthContext.Provider
            value={{ token, userId, login: loginHandler, logout: logoutHandler, isLogged }}
        >
            {children}
        </AuthContext.Provider>
    );
};


AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthContext };

export default AuthContextProvider;
