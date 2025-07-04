import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactElement } from "react";

/**
 * BlurIcon Component
 *
 * This component renders a custom SVG icon representing a blur effect.
 * @param {SvgIconProps} props - the props to customize the SVG icon.
 * @returns {ReactElement} - the blur icon.
 */
const BlurIcon = (props: SvgIconProps): ReactElement => (
  <SvgIcon {...props} viewBox="0 0 24 24" data-testid="blurIcon">
    <circle cx="0.895" cy="9.198" r="0.895" />
    <circle cx="0.895" cy="14.134" r="0.895" />
    <circle cx="23.105" cy="9.198" r="0.895" />
    <circle cx="23.105" cy="14.134" r="0.895" />
    <circle cx="9.532" cy="0.895" r="0.895" />
    <circle cx="14.468" cy="0.895" r="0.895" />
    <circle cx="14.468" cy="23.105" r="0.895" />
    <circle cx="9.532" cy="23.105" r="0.895" />
    <circle cx="5.03" cy="4.825" r="1.123" />
    <circle cx="9.614" cy="4.825" r="1.123" />
    <circle cx="14.196" cy="4.825" r="1.123" />
    <circle cx="18.779" cy="4.825" r="1.123" />
    <circle cx="18.779" cy="9.408" r="1.123" />
    <circle cx="18.779" cy="13.991" r="1.123" />
    <circle cx="18.779" cy="18.573" r="1.123" />
    <circle cx="5.03" cy="18.573" r="1.123" />
    <circle cx="5.03" cy="13.991" r="1.123" />
    <circle cx="5.03" cy="9.408" r="1.123" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.936 10.219C13.936 11.411 12.961 12.387 11.769 12.387C10.576 12.387 9.601 11.411 9.601 10.219C9.601 9.027 10.576 8.051 11.769 8.051C12.961 8.051 13.936 9.027 13.936 10.219ZM11.936 14.323C13.39 14.323 16.233 15.336 16.233 17.68V19.012H7.639V17.68C7.639 15.336 10.482 14.323 11.936 14.323Z"
    />
    <path d="M16.233 19.012V19.912H17.133V19.012H16.233ZM7.639 19.012H6.739V19.912H7.639V19.012ZM11.769 13.287C13.458 13.287 14.836 11.909 14.836 10.219H13.036C13.036 10.914 12.464 11.487 11.769 11.487V13.287ZM8.701 10.219C8.701 11.909 10.079 13.287 11.769 13.287V11.487C11.073 11.487 10.501 10.914 10.501 10.219H8.701ZM11.769 7.151C10.079 7.151 8.701 8.53 8.701 10.219H10.501C10.501 9.524 11.073 8.951 11.769 8.951V7.151ZM14.836 10.219C14.836 8.53 13.458 7.151 11.769 7.151V8.951C12.464 8.951 13.036 9.524 13.036 10.219H14.836ZM17.133 17.68C17.133 16.084 16.149 14.997 15.099 14.355C14.063 13.721 12.826 13.423 11.936 13.423V15.223C12.5 15.223 13.411 15.432 14.159 15.89C14.895 16.34 15.333 16.932 15.333 17.68H17.133ZM17.133 19.012V17.68H15.333V19.012H17.133ZM7.639 19.912H16.233V18.112H7.639V19.912ZM6.739 17.68V19.012H8.539V17.68H6.739ZM11.936 13.423C11.046 13.423 9.808 13.721 8.772 14.355C7.723 14.997 6.739 16.084 6.739 17.68H8.539C8.539 16.932 8.976 16.34 9.712 15.89C10.461 15.432 11.372 15.223 11.936 15.223V13.423Z" />
  </SvgIcon>
);

export default BlurIcon;
