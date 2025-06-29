import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, Mock, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import LayoutToggleButton from "./LayoutToggleButton";
import useSessionContext from "../../../hooks/useSessionContext";

vi.mock("../../../hooks/useSessionContext");

describe("LayoutToggleButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render the sidebar view icon if it is an active speaker layout", () => {
    (useSessionContext as Mock).mockReturnValue({
      layoutMode: "active-speaker",
    });
    render(<LayoutToggleButton isScreenSharePresent={false} />);
    expect(screen.getByTestId("ViewSidebarIcon")).toBeInTheDocument();
  });

  it("should render the sidebar window icon if it is a grid layout", () => {
    (useSessionContext as Mock).mockReturnValue({ layoutMode: "grid" });
    render(<LayoutToggleButton isScreenSharePresent={false} />);
    expect(screen.getByTestId("WindowIcon")).toBeInTheDocument();
  });

  it("should render the tooltip title that mentions switching to grid layout", async () => {
    (useSessionContext as Mock).mockReturnValue({
      layoutMode: "active-speaker",
    });
    render(<LayoutToggleButton isScreenSharePresent={false} />);
    const button = await screen.findByRole("button");
    await userEvent.hover(button);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toBe("Switch to Grid layout");
  });

  it("should render the tooltip title that mentions switching to active speaker layout", async () => {
    (useSessionContext as Mock).mockReturnValue({ layoutMode: "grid" });
    render(<LayoutToggleButton isScreenSharePresent={false} />);
    const button = await screen.findByRole("button");
    await userEvent.hover(button);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toBe("Switch to Active Speaker layout");
  });

  it("should render the tooltip title that mentions switching layouts is not allowed when screenshare is present if currently in the grid mode", async () => {
    (useSessionContext as Mock).mockReturnValue({ layoutMode: "grid" });
    render(<LayoutToggleButton isScreenSharePresent />);
    const button = await screen.findByRole("button");
    await userEvent.hover(button);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toBe(
      "Cannot switch layout while screen share is active",
    );
  });

  it("should render the tooltip title that mentions switching layouts is not allowed when screenshare is present if currently in the active speaker mode", async () => {
    (useSessionContext as Mock).mockReturnValue({
      layoutMode: "active-speaker",
    });
    render(<LayoutToggleButton isScreenSharePresent />);
    const button = await screen.findByRole("button");
    await userEvent.hover(button);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toBe(
      "Cannot switch layout while screen share is active",
    );
  });
});
