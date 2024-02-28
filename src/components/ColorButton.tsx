import { radioColorVariants } from "@/utilities/radioColorVariants";

export enum radioColorValues {
  "crimson",
  "sunrise",
  "sunny",
  "emerald",
  "azure",
  "velvet",
  "skyblue",
  "rosy",
  "transparent", // WHEN NO COLOR IS CHOSEN
}

type ColorButtonProps = {
  value?: radioColorValues;
};

export function ColorButton({ value }: ColorButtonProps) {
  const valueStyles =
    value == null ? "bg-transparent" : `${radioColorVariants[value]}`;

  return (
    <button
      className={`h-10 w-10 border-2 border-slate-600 m-1 rounded-full hover:brightness-[.8] ${valueStyles}`}
    ></button>
  );
}
export default ColorButton;
