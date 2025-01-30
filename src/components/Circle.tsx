type CircleProps = {
  size: "small" | "medium" | "large";
  color: string;
};

export default function Circle({ size, color }: CircleProps) {
  const sizeVariants = {
    small: "h-4 w-4",
    medium: "h-7 w-7",
    large: "h-9 w-9",
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
    present: "bg-slate-300",
    match: "bg-black",
  };

  return (
    <div
      className={`${sizeVariants[size]} ${colorVariants[color]} border-2 border-gray-600 m-[2px] sm:m-1 rounded-full hover:brightness-[.8]`}
    ></div>
  );
}
