import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
            const { password, ...userWithoutPass } = foundUser;
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
            setUser(userWithoutPass);
            return { success: true };
        }
        return { success: false, message: 'Invalid username or password' };
    };

    const signup = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        const newUser = { id: Date.now().toString(), username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        const { password: _, ...userWithoutPass } = newUser;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
        setUser(userWithoutPass);

        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
