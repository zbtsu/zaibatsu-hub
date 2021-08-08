import type firebase from "firebase";

export interface IAuthor {
  displayName: string | null | undefined;
  uid: string | null | undefined;
  photoURL: string | null | undefined;
}

const Author = (user: firebase.User | IAuthor) => {
  console.log({ user });
  const { displayName = "", uid = "", photoURL = "" } = user;
  return {
    displayName,
    uid,
    photoURL,
  };
};

export default Author;
