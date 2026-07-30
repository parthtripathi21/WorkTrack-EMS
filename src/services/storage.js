export const initializeStorage = (employees, admin) => {
  if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify(employees));
  }

  if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(admin));
  }
};

export const getEmployees = () =>
  JSON.parse(localStorage.getItem("employees")) || [];

export const saveEmployees = (employees) =>
  localStorage.setItem("employees", JSON.stringify(employees));

export const getAdmin = () =>
  JSON.parse(localStorage.getItem("admin")) || [];

export const getLoggedInUser = () =>
  JSON.parse(localStorage.getItem("loggedInUser"));

export const saveLoggedInUser = (user) =>
  localStorage.setItem("loggedInUser", JSON.stringify(user));

export const logoutUser = () =>
  localStorage.removeItem("loggedInUser");