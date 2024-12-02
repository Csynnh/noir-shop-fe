import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our AuthContext
interface AuthContextType {
  user: UserInfo | null;
  saveUserInfo: (userInfo: UserInfo) => void;
  removeToken: () => void;
}

export type UserInfo = {
  name: string;
  username: string;
  token: string;
  account_id: string;
  expiredTime: string;
  email: string;
  phone: string;
};
// Create the context with an empty default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the provider's props type
interface AuthProviderProps {
  children: ReactNode;
}

// Provide the context with type checking
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  // Save the user info and store it in local storage
  const saveUserInfo = (userInfo: UserInfo) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  // Remove the token from local storage and reset state
  const removeToken = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Retrieve token from local storage on initialization
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userInfo: UserInfo = JSON.parse(savedUser);
      setUser(userInfo);
    }
  }, []);

  const value = {
    user,
    saveUserInfo,
    removeToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
