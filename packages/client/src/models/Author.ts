import type firebase from "firebase";
const Author = (user: firebase.User) => {
  console.log({ user });
  const { displayName = "", uid = "", photoURL = "" } = user;
  return {
    displayName,
    uid,
    photoURL,
  };
};

export default Author;
