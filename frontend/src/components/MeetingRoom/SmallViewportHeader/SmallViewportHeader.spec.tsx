import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  vi,
  describe,
  it,
  Mock,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "vitest";
import SmallViewportHeader from "./SmallViewportHeader";
import useSessionContext from "../../../hooks/useSessionContext";
import useRoomName from "../../../hooks/useRoomName";
import useRoomShareUrl from "../../../hooks/useRoomShareUrl";

vi.mock("../../../hooks/useSessionContext");
vi.mock("../../../hooks/useRoomName");
vi.mock("../../../hooks/useRoomShareUrl");

describe("SmallViewportHeader component", () => {
  const mockedRoomName = "test-room-name";
  const originalClipboard: Clipboard = navigator.clipboard;

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  afterAll(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  beforeEach(() => {
    (useRoomName as Mock).mockReturnValue(mockedRoomName);
    (useRoomShareUrl as Mock).mockReturnValue(
      "https://example.com/room/test-room-name",
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the room name", () => {
    (useSessionContext as Mock).mockReturnValue({ archiveId: null });

    render(<SmallViewportHeader />);

    expect(screen.getByText(mockedRoomName)).toBeInTheDocument();
  });

  it("shows the recording icon if it is currently in progress", () => {
    (useSessionContext as Mock).mockReturnValue({ archiveId: "123-456" });

    render(<SmallViewportHeader />);

    expect(screen.getByTestId("RadioButtonCheckedIcon")).toBeInTheDocument();
  });

  it("does not show the recording icon if it there is not one happening", () => {
    (useSessionContext as Mock).mockReturnValue({ archiveId: null });

    render(<SmallViewportHeader />);

    expect(
      screen.queryByTestId("RadioButtonCheckedIcon"),
    ).not.toBeInTheDocument();
  });

  it("copies room share URL to clipboard", async () => {
    (useSessionContext as Mock).mockReturnValue({ archiveId: null });
    render(<SmallViewportHeader />);

    const copyButton = screen.getByTestId("ContentCopyIcon");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "https://example.com/room/test-room-name",
      );
      expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
    });
  });
});
