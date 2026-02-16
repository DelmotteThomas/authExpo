import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

interface UserType {
  id: number;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStoreAuth();
  }, []);

  const loadStoreAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (storedToken && storedUser) {
        api.setToken(storedToken);
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("une erruer chargement auth", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try{
    const response = await api.login(email, password);

    await AsyncStorage.setItem("token", response.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.user));
    api.setToken(response.token);
    setToken(response.token);
    setUser(response.user);
    }catch(error){

    console.log("Erreur login", error);
    throw error;
  }
  };

  const register = async (email: string, password: string) => {
    const response = await api.register(email, password);

    await AsyncStorage.setItem("token", response.token);
    await AsyncStorage.setItem("token", JSON.stringify(response.user));
    api.setToken(response.token);
    setToken(response.token);
    setUser(response.user);
  
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    api.setToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit etre dans un AuthProviders");
  }
  return context;
}
