import { SingleArchiveResponse } from "@vonage/video";
import { Archive } from "opentok";

export interface VideoService {
  createSession(): Promise<string>;
  generateToken(sessionId: string): {
    token: string;
    applicationId?: string;
    apiKey?: string;
  };
  startArchive(
    roomName: string,
    sessionId: string,
  ): Promise<Archive | SingleArchiveResponse>;
  stopArchive(archiveId: string): Promise<string>;
  listArchives(
    sessionId: string,
  ): Promise<Archive[] | SingleArchiveResponse[] | undefined>;
}
