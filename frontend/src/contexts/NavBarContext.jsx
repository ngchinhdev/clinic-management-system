import { createContext, useState, useEffect } from "react";
// Tạo context
export const NavbarContext = createContext();

// Tạo provider
export const NavbarProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isNavbarVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isNavbarVisible]);

  return (
    <NavbarContext.Provider
      value={{ isNavbarVisible, setIsNavbarVisible, toggleNavbar }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
