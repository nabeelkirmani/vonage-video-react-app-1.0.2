import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ScreenSharingButton, {
  ScreenShareButtonProps,
} from "./ScreenSharingButton";

describe("ScreenSharingButton", () => {
  const mockToggleScreenShare = vi.fn();

  const defaultProps: ScreenShareButtonProps = {
    toggleScreenShare: mockToggleScreenShare,
    isSharingScreen: false,
    isViewingScreenShare: false,
  };

  it("renders the share screen button", () => {
    render(<ScreenSharingButton {...defaultProps} />);
    expect(screen.getByTestId("ScreenShareIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    button.click();
    expect(mockToggleScreenShare).toHaveBeenCalled();
  });

  it("renders the share screen off button", () => {
    render(<ScreenSharingButton {...defaultProps} isSharingScreen />);
    expect(screen.getByTestId("StopScreenShareIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    button.click();
    expect(mockToggleScreenShare).toHaveBeenCalled();
  });

  it("renders the pop up dialog to confirm that user wants to kick off another screenshare", () => {
    render(<ScreenSharingButton {...defaultProps} isViewingScreenShare />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.getByText(
        "Looks like there is someone else sharing their screen. If you continue, their screen is no longer going to be shared.",
      ),
    ).toBeInTheDocument();
  });
});
