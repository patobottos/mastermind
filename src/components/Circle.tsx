type CircleProps = {
  size: "small" | "medium" | "large";
  color: string;
};

export default function Circle({ size, color }: CircleProps) {
  const sizeVariants = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-10 w-10",
  };

  const colorVariants: { [key: string]: string } = {
    crimson: "bg-crimson",
    sunrise: "bg-sunrise",
    sunny: "bg-sunny",
    emerald: "bg-emerald",
    azure: "bg-azure",
    velvet: "bg-velvet",
    skyblue: "bg-skyblue",
    rosy: "bg-rosy",
    miss: "bg-transparent",
    present: "bg-white",
    match: "bg-black",
  };

  return (
    <div
      className={`${sizeVariants[size]} ${colorVariants[color]} border-2 border-gray-600 m-1 rounded-full hover:brightness-[.8]`}
    ></div>
  );
}
