import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {User} from '../../types/types';
import { getGroupsOfUser, getUserId } from '@/modules/firebase/userAccess';

interface AuthContextType {
  user: User | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>// Store the full User object
  login: (username: string) => Promise<void>;
  setCurrentGroup: (groupID: number) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: async () => {},
  setCurrentGroup: () => {},
});

export const useAuth = () => useContext(AuthContext);





export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

   function setCurrentGroup(groupID: number) {
    if (user) {
      if(groupID === -1){
        setUser({ ...user, currentGroup: groupID, currentIsPublic: true });
      } else {
      setUser({ ...user, currentGroup: groupID, currentIsPublic: false });
    }
  }
  }

  function getUserFromName(username : string) {
  
    getUserId(username).then(response => {
          if (!response) {
            throw new Error('Network response was not ok');
          }
          getGroupsOfUser(username).then(groups => {
              setUser({
                name: username,
                userID: response,
                currentGroup: -1,
                currentIsPublic: true,
                assignedGroups: groups
              })
          });
        })
        .catch(error => {
          console.error('Error fetching user ID:', error);
        });
        /*const fetchedUser: User = {
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
        setUser(fetchedUser);*/
    
  }
  const login = async (username: string) => {
    // Call the function to get the full user object from username
    getUserFromName(username);

  };




  return (
    <AuthContext.Provider value={{ user, login, setUser, setCurrentGroup }}>
      {children}
    </AuthContext.Provider>
  );
};
