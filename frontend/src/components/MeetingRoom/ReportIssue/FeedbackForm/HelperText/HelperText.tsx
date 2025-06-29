import { Box } from "@mui/material";
import { ReactElement } from "react";

export type ErrorType = "Title" | "Your name" | "Description";
export type ColorStyle = "inherit" | "red";

export type HelperTextProps = {
  isError: boolean;
  errorType: ErrorType;
  colorStyle: ColorStyle;
  textLimit: number;
  formText: string;
  testId: string;
};

/**
 * HelperText Component
 *
 * Renders the helper text for a given field. If there is an error, displays instructions to
 * rectify it.
 * @param {HelperTextProps} props - The props for the component.
 *  @property {boolean} isError - Whether to display the error or not.
 *  @property {ErrorType} errorType - What kind of error this is.
 *  @property {ColorStyle} colorStyle - Whether to use plain or red text.
 *  @property {number} textLimit - How many characters can exist for the form type.
 *  @property {string} formText - What is present in the form's field.
 *  @property {string} testId - The testId to assign to the error name
 * @returns {ReactElement} The HelperText component
 */
const HelperText = ({
  errorType,
  colorStyle,
  isError,
  textLimit,
  formText,
  testId,
}: HelperTextProps): ReactElement => {
  const errorName = (field: string, limit: number) => {
    return `${field} is required and must be less than ${limit} characters`;
  };

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <span
        data-testid={testId}
        style={{
          color: colorStyle,
        }}
      >
        {isError ? errorName(errorType, textLimit) : ""}
      </span>
      <span
        style={{
          ...(isError && {
            color: colorStyle,
          }),
        }}
      >
        {!isError ? `${formText.length}/${textLimit}` : ""}
      </span>
    </Box>
  );
};

export default HelperText;
