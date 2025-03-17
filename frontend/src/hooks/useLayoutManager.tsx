import { useRef } from 'react';
import { Box, Element } from 'opentok-layout-js';
import LayoutManager from '../utils/layoutManager';

export type GetLayout = (
  containerDimensions: { height: number; width: number },
  boxes: Element[]
) => Box[];

/**
 * React hook to return a getLayout function as defined here:
 * https://github.com/aullman/opentok-layout-js?tab=readme-ov-file#usage
 * getLayout takes an array of Element objects and returns an array of Box objects
 * which specify exact size and position of video tiles
 * @returns {GetLayout} getLayout
 */
const useLayoutManager = (): GetLayout => {
  const layoutManager = useRef(new LayoutManager());
  return layoutManager.current.getLayout.bind(layoutManager.current);
};

export default useLayoutManager;
