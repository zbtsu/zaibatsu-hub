const tags = [
  "Rage",
  "Rage Art",
  "Rage Drive",
  "Advanced",
  "Intermediate",
  "Beginner",
  "Wall",
  "Counter Hit",
];

export const TagOptions = tags.map((tag) => ({
  value: tag.toLowerCase().split(" ").join("-"),
  label: tag,
}));

export default tags;
