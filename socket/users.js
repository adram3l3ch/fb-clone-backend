let usersOnline = [];

const addUser = (id, socketID) => {
   usersOnline = usersOnline.filter(user => user.id !== id);
   usersOnline.push({ id, socketID });
};
const getSocketID = id => {
   return usersOnline.find(user => user.id === id)?.socketID;
};

const getUserID = sid => {
   return usersOnline.find(user => user.socketID === sid)?.id;
};

const removeUser = sid => {
   usersOnline = usersOnline.filter(user => user.socketID !== sid);
};

module.exports = { usersOnline, addUser, getUserID, getSocketID, removeUser };
