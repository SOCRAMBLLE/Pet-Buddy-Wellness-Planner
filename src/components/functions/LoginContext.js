import { createContext, useState } from "react";

const LoginContext = createContext({username: '', auth: false});

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState({ username: '', auth: false});

    const login = (username) => {
        setUser((user) => ({
            username: username,
            auth: true,
        }));
    };

    const logout = () => {
        setUser((user) => ({
            username: '',
            auth: false,
        }));
    };

    return (
        <LoginContext.Provider value = {{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginProvider, LoginContext };