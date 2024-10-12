import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  userId: number | null;
  username: string| null;
  login: (username: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  username: null,
  login: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const login = async (username: string) => {
    // Simulate backend call to get userId from username
    /*
    try {
      const response = await fetch('https://your-backend-api.com/getUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (data && data.userId) {
        setUserId(data.userId); // Store userId
        setUsername(username);  // Store username
      } else {
        throw new Error('Failed to fetch user ID');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
      */
    setUserId(25);
  };

  return (
    <AuthContext.Provider value={{ userId, username, login }}>
      {children}
    </AuthContext.Provider>
  );
};
