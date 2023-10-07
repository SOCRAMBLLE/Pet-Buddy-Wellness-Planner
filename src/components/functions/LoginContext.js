import { createContext, useState } from "react";

const LoginContext = createContext({username: '', auth: false});

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // retrieve login info from localStorage when app loads
        const storedUser = localStorage.getItem('loggedInUser');
        return storedUser ? JSON.parse(storedUser) : { username: '', auth: false };
    });

    const login = (username) => {
        setUser((user) => ({
            username: username,
            auth: true,
        }));
    
        localStorage.setItem('loggedInUser', JSON.stringify({ username, auth: true }));
    };
    

    const logout = () => {
        setUser((user) => ({
            username: '',
            auth: false,
        }));

        localStorage.removeItem('loggedInUser');
    };

    return (
        <LoginContext.Provider value = {{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginProvider, LoginContext };