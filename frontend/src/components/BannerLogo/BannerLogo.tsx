import { ReactElement } from "react";
import { Link } from "react-router-dom";

/**
 * BannerLogo Component
 *
 * This component returns the logo that redirects to the landing page when clicked.
 * @returns {ReactElement} - the banner logo component
 */
const BannerLogo = (): ReactElement => (
  <Link to="..">
    <div className="box-border pt-2 pl-2">
      <img
        className="h-[72px] pl-4 pr-8 hidden md:flex"
        src="/images/onasi-logo-desktop.svg"
        alt="Onasi-logo"
      />
      <img
        className="h-10 mt-1 my-2 pl-4 pr-8 md:hidden"
        src="/images/onasi-logo-mobile.svg"
        alt="Onasi-logo"
      />
    </div>
  </Link>
);

export default BannerLogo;
