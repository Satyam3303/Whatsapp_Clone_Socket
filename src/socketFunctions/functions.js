//A local User Array to keep a track of concurrent connected User
let users = [];

//Add user into the array
export const addUser = (userData, socketId) => {
  const exists = users.some((user) => user.sub === userData.sub);
  if (!exists) {
    users.push({ ...userData, socketId });
  }
};

//Find the user from the array
export const getUser = (userId) => {
  return users.find((user) => user.sub === userId) || null;
};

//Remove user on disconection
export const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const getUsers = () => users;
