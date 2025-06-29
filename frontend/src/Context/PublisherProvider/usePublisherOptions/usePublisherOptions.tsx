import { useMemo } from "react";
import {
  PublisherProperties,
  VideoFilter,
  AudioFilter,
  hasMediaProcessorSupport,
} from "@vonage/client-sdk-video";
import useUserContext from "../../../hooks/useUserContext";
import getInitials from "../../../utils/getInitials";

/**
 * React hook to get PublisherProperties combining default options and options set in UserContext
 * @returns {PublisherProperties} publisher properties object
 */
const usePublisherOptions = (): PublisherProperties => {
  const { user } = useUserContext();

  const publisherOptions: PublisherProperties = useMemo(() => {
    const { name } = user.defaultSettings;
    const initials = getInitials(name);

    // Enable Advanced Noise Suppression if user has enabled it in their settings and the device supports it
    const audioFilter: AudioFilter | undefined =
      user.defaultSettings.noiseSuppression && hasMediaProcessorSupport()
        ? {
            type: "advancedNoiseSuppression",
          }
        : undefined;

    // Enable Background blur if user has enabled it in their settings and the device supports it
    const videoFilter: VideoFilter | undefined =
      user.defaultSettings.blur && hasMediaProcessorSupport()
        ? {
            type: "backgroundBlur",
            blurStrength: "high",
          }
        : undefined;
    return {
      audioFallback: {
        publisher: true,
      },
      audioSource: user.defaultSettings.audioSource,
      initials,
      insertDefaultUI: false,
      name,
      publishAudio: !!user.defaultSettings.publishAudio,
      publishVideo: !!user.defaultSettings.publishVideo,
      resolution: "1280x720",
      audioFilter,
      videoFilter,
      videoSource: user.defaultSettings.videoSource,
    };
  }, [user.defaultSettings]);

  return publisherOptions;
};

export default usePublisherOptions;
