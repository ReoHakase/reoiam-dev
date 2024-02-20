'use client';

import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { useRef, useEffect, useMemo } from 'react';
import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

/**
 * Converts a hexadecimal color code to RGB values.
 * @param hex The hexadecimal color code to convert. e.g. `#ffffff`
 * @returns An array containing the RGB values [red, green, blue]. Each value is in the range 0-1
 */
const convertHexToRgb = (hex: string): [number, number, number] => {
  const hexCode = hex.replace('#', '');
  const r = parseInt(hexCode.substring(0, 2), 16) / 255;
  const g = parseInt(hexCode.substring(2, 4), 16) / 255;
  const b = parseInt(hexCode.substring(4, 6), 16) / 255;
  return [r, g, b];
};

export type GlobeProps = {
  css?: SystemStyleObject;
};

/**
 * Renders a globe component.
 * @param css The style props in PandaCSS format.
 * @returns The rendered globe component.
 */
export const Globe = ({ css: cssProps = {}, ...props }: GlobeProps): ReactNode => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme(); // If enableSystem is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to theme
  const globeDarkAttribute = useMemo(() => (resolvedTheme === 'dark' ? 1 : 0), [resolvedTheme]);
  const globeGlowColorAttribute = useMemo<[number, number, number]>(
    () => (resolvedTheme === 'dark' ? [0.2, 0.2, 0.2] : [1, 1, 1]),
    [resolvedTheme],
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 1.4;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 584 * 2,
      height: 584 * 2,
      phi: 0,
      theta: 0.175,
      dark: globeDarkAttribute,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: convertHexToRgb('#FBFCFD'), // keyplate.2
      markerColor: convertHexToRgb('#DFE3E6'), // keyplate.6
      glowColor: globeGlowColorAttribute,
      markers: [
        // longitude latitude
        // { location: [37.7595, -122.4367], size: 0.03 },
        // { location: [40.7128, -74.006], size: 0.1 },
        { location: [35.6895, 139.6917], size: 0.05 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.0025;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [canvasRef, globeDarkAttribute, globeGlowColorAttribute]);

  return (
    <div
      className={css(
        {
          pos: 'relative',
          flexShrink: '0',
          w: '584px',
          h: '584px',
          aspectRatio: '1',
        },
        cssProps,
      )}
      {...props}
    >
      <div
        className={css({
          pos: 'absolute',
          w: '242px',
          aspectRatio: '1',
          rounded: 'full',
          bg: {
            // NOTE: Radix color `cyan.9` was specified literally in order to reduce output css size, since purple scale is barely used.
            // Refer: https://www.radix-ui.com/colors
            base: '#00A2C7',
            _p3: 'color(display-p3 0.282 0.627 0.765)',
          },
          top: '83px',
          left: '-82px',
          filter: 'blur(150px)',
        })}
      />
      <div
        className={css({
          pos: 'absolute',
          w: '204px',
          aspectRatio: '1',
          rounded: 'full',
          bg: {
            // NOTE: Radix color `yellow.9` was specified literally in order to reduce output css size, since purple scale is barely used.
            // Refer: https://www.radix-ui.com/colors
            base: '#FFE629',
            _p3: 'color(display-p3 1 0.92 0.22)',
          },
          top: '407px',
          left: '200px',
          filter: 'blur(150px)',
        })}
      />
      <div
        className={css({
          pos: 'absolute',
          w: '203px',
          aspectRatio: '1',
          rounded: 'full',
          bg: {
            // NOTE: Radix color `pink.9` was specified literally in order to reduce output css size, since purple scale is barely used.
            // Refer: https://www.radix-ui.com/colors
            base: '#D6409F',
            _p3: 'color(display-p3 0.775 0.297 0.61)',
          },
          top: '360px',
          left: '445px',
          filter: 'blur(150px)',
        })}
      />
      <div
        className={css({
          pos: 'absolute',
          w: '172px',
          aspectRatio: '1',
          rounded: 'full',
          bg: {
            // NOTE: Radix color `purple.9` was specified literally in order to reduce output css size, since purple scale is barely used.
            // Refer: https://www.radix-ui.com/colors
            base: '#8E4EC6',
            _p3: 'color(display-p3 0.523 0.318 0.751)',
          },
          top: '9px',
          left: '273px',
          filter: 'blur(150px)',
        })}
      />
      <canvas
        ref={canvasRef}
        className={css({
          w: '100%',
          h: '100%',
          aspectRatio: '1',
        })}
      />
    </div>
  );
};

// NOTE: Disabled since `next/dynamic` somehow fails to manage named export components
// eslint-disable-next-line import/no-default-export
export default Globe;
