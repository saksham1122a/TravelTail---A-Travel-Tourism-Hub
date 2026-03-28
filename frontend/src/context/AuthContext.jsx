import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchUser();
  }, []);

  const login = (userData, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
