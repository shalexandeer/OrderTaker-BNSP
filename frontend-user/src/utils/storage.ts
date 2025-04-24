// function get user from local storage



export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

// function set user to local storage
export const setUser = (user: User) => {
  const serializedUser = JSON.stringify(user);
  localStorage.setItem('user', serializedUser);
};

// function remove user from local storage
export const removeUser = () => {
  localStorage.removeItem('user');
};

// function get token from local storage
export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }
  return null;
};


