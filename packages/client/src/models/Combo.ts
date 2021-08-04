import tags from "../data/tags";
import Author from "./Author";
import Comment from "./Comment";
import firebase from "firebase/app";

type ValueOf<T> = T[keyof T];

interface Props {
  author?: ReturnType<typeof Author>;
  string: string;
  tags: string[];
  damage: number;
  character: boolean;
  comments?: typeof Comment[];
  date: string;
  name: string;
}

const Combo = ({
  author,
  string,
  tags,
  comments,
  character,
  damage,
  date,
  name,
}: Props) => ({
  author,
  string,
  tags,
  name,
  damage,
  character,
  comments,
  date: date || firebase.firestore.FieldValue.serverTimestamp(),
});

export type ICombo = ReturnType<typeof Combo>;

export default Combo;
