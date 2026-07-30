import { createContext, useEffect, useState } from "react";
import { employees as demoEmployees, admin } from "../data/demoData";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : demoEmployees;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        employees,
        setEmployees,
        admin,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}