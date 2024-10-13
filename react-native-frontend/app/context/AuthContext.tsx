import React, { createContext, useState, useContext, ReactNode } from 'react';
import {User} from '../../types/types';

interface AuthContextType {
  user: User | null; // Store the full User object
  login: (username: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
});

export const useAuth = () => useContext(AuthContext);





export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  function getUserFromName(username : string) {
    /*
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
        });*/
        const fetchedUser: User = {
           // Simulated groups array
            name: username,
            userID: 1,
            currentGroup: 1,
            currentIsPublic: false,
            assignedGroups: [
              {
                groupID: 1,
                groupName: 'Group 1',
                userIDs: [1, 2, 3],
                userNames: ['User 1', 'User 2', 'User 3'],
              },
              {
                groupID: 2,
                groupName: 'Group 2',
                userIDs: [4, 5, 6],
                userNames: ['User 4', 'User 5', 'User 6'],
              },],
        };
        setUser(fetchedUser);
    
  }
  const login = async (username: string) => {
    // Call the function to get the full user object from username
    getUserFromName(username);

  };




  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
