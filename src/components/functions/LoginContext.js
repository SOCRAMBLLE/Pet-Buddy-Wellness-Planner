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
        // Clean state
        setUser({ username: '', auth: false });
    
        // Remove login info of localStorage
        localStorage.removeItem('loggedInUser');
    
        // Redirects use to login page
        window.location.href = '/login'; 
    };
    

    return (
        <LoginContext.Provider value = {{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginProvider, LoginContext };