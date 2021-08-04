import Author from "./Author";

interface Props {
  author: ReturnType<typeof Author>;
  comment: string;
  stars: Record<string, boolean>;
}

const Comment = ({ author, comment, stars }: Props) => ({
  author,
  comment,
  stars,
});

export default Comment;
