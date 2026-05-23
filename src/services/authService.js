export const loginUser = (email, password) => {

  const defaultUser = {
    email: "admin@gmail.com",
    password: "123456",
  };

  if (
    email === defaultUser.email &&
    password === defaultUser.password
  ) {

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    return true;
  }

  return false;
};

export const logoutUser = () => {

  localStorage.removeItem(
    "isAuthenticated"
  );

};

export const isAuthenticated = () => {

  return (
    localStorage.getItem("isAuthenticated") === "true"
  );

};