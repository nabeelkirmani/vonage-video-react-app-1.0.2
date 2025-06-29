import { MutableRefObject } from "react";
import { Dimensions } from "@vonage/client-sdk-video";
import getLayoutElementArray, {
  GetLayoutElementArrayProps,
  LayoutBoxes,
} from "./getLayoutElements";
import { GetLayout } from "../../../hooks/useLayoutManager";

export type GetLayoutBoxesProps = {
  getLayout: GetLayout;
  wrapDimensions: Dimensions;
  wrapRef: MutableRefObject<HTMLElement | null>;
} & GetLayoutElementArrayProps;

/**
 * Helper to get the array of Box objects which define position and size of video elements
 * @param {GetLayoutBoxesProps} props - a combination of call state and video elements needed to determine layout positions
 * @returns {LayoutBoxes} boxes - an array of Box objects
 */
const getLayoutBoxes = ({
  getLayout,
  wrapDimensions,
  wrapRef,
  ...layoutProps
}: GetLayoutBoxesProps): LayoutBoxes => {
  if (!wrapRef.current) {
    return {};
  }
  // Boxes are returned at the same index as the layout Element passed in
  // See: https://github.com/aullman/opentok-layout-js/?tab=readme-ov-file#usage
  // So for us:
  // index 0 - publisher box
  // last index n - hidden tile participant if present
  // last index n after popping hidden tile - local screenshare box
  // remaining indices between 1 and n after popping screenshare - subscriber boxes in display order
  const boxes = getLayout(wrapDimensions, getLayoutElementArray(layoutProps));
  const publisherBox = boxes.shift();
  const hiddenParticipantsBox = layoutProps.hiddenSubscribers.length
    ? boxes.pop()
    : undefined;
  const localScreenshareBox = layoutProps.isSharingScreen
    ? boxes.pop()
    : undefined;
  return {
    publisherBox,
    hiddenParticipantsBox,
    localScreenshareBox,
    subscriberBoxes: boxes,
  };
};

export default getLayoutBoxes;
