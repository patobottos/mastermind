type CircleProps = {
  size: "small" | "medium" | "large";
  color: string;
};

function Circle({ size, color }: CircleProps) {
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
    sky: "bg-sky",
    rosy: "bg-rosy",
    miss: "bg-transparent",
    present: "border-white bg-white",
    match: "border-black bg-black",
  };

  return (
    <div
      className={`${sizeVariants[size]} ${colorVariants[color]} border-2 border-gray-600 m-1 rounded-full hover:brightness-[.8]`}
    ></div>
  );
}

export default Circle;
