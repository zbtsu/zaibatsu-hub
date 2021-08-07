import Author from "./Author";
import Comment from "./Comment";
import firebase from "firebase/app";
import { generateId } from "../utils/nanoid";

interface Props {
  id?: string;
  author?: firebase.User;
  string: string;
  tags: string[];
  damage: number | string;
  character: number;
  comments?: typeof Comment[];
  date?: string;
  name: string;
  online?: boolean;
}

const Combo = ({
  id,
  author,
  string,
  tags,
  comments,
  character,
  damage,
  date,
  name,
  online = false,
}: Props) => ({
  id: id || generateId(32),
  author: author ? Author(author) : undefined,
  string,
  tags,
  name,
  damage,
  character,
  comments,
  date: online ? firebase.firestore.FieldValue.serverTimestamp() : new Date(),
});

export type ICombo = ReturnType<typeof Combo>;

export default Combo;
