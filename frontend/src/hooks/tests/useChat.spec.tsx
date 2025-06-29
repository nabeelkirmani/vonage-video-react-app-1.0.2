import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, Mocked, vi } from "vitest";
import { MutableRefObject } from "react";
import { Session } from "@vonage/client-sdk-video";
import useChat from "../useChat";
import useUserContext from "../useUserContext";
import { UserContextType } from "../../Context/user";

vi.mock("../useUserContext.tsx");
const mockUseUserContext = useUserContext as Mock<[], UserContextType>;
const mockUserContext = {
  user: {
    defaultSettings: { name: "Local User" },
  },
} as UserContextType;

describe("useChat", () => {
  let sessionMock: Mocked<Session>;
  let sessionRefMock: MutableRefObject<Session | null>;
  beforeEach(() => {
    mockUseUserContext.mockImplementation(() => mockUserContext);
    sessionMock = {
      signal: vi.fn(),
    } as unknown as Mocked<Session>;
    sessionRefMock = {
      current: sessionMock,
    } as unknown as MutableRefObject<Session | null>;
  });

  it("onChatMessage should parse message and update messages state", () => {
    const { result, rerender } = renderHook(() =>
      useChat({ sessionRef: sessionRefMock }),
    );

    act(() => {
      result.current.onChatMessage(
        '{"participantName":"Remote User","text":"Hello!"}',
      );
    });
    rerender();

    expect(result.current.messages[0]).toMatchObject({
      participantName: "Remote User",
      message: "Hello!",
      timestamp: expect.any(Number),
    });
  });

  it("sendChatMessage should send message via signal", () => {
    const { result } = renderHook(() =>
      useChat({ sessionRef: sessionRefMock }),
    );

    result.current.sendChatMessage("Hello there!");

    expect(sessionMock.signal).toHaveBeenCalledWith({
      type: "chat",
      data: '{"participantName":"Local User","text":"Hello there!"}',
    });
  });
});
