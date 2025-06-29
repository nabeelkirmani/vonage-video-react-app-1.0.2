import { ReactElement } from "react";

export type SeparatorProps = {
  orientation?: "left" | "right";
};

/**
 * Separator Component
 *
 * This component renders a horizontal line with customizable orientation that is set to left by default.
 * @param {SeparatorProps} props - the props for the component.
 *  @property {'left' | 'right'} orientation - whether the separator is oriented to the left or right
 * @returns {ReactElement} The separator component.
 */
const Separator = ({ orientation = "left" }: SeparatorProps): ReactElement => {
  return (
    <div
      className={`border-slate-200 border-b-2 border-solid w-6/12 ${orientation === "left" ? "mr-4" : "ml-4"}`}
    />
  );
};

export default Separator;
