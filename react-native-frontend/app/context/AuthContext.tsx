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

  function getIdFromName(name : string) {
    
    setUsername(name);
    fetch(`/api/getIdFromName/${name}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
          setUserId(data);
        })
        .catch(error => {
          console.error('Error fetching user ID:', error);
        });
    
  }
  const login = async (user: string) => {
    getIdFromName(user);
  };

  return (
    <AuthContext.Provider value={{ userId, username, login }}>
      {children}
    </AuthContext.Provider>
  );
};
