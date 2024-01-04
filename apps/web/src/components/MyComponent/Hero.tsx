import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

export type GProps = {
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
      baseColor: convertHexToRgb('#FBFCFD'), // slate.2
      markerColor: convertHexToRgb('#DFE3E6'), // slate.6
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
          position: 'relative',
          width: '584px',
        },
        cssProps,
      )}
      {...props}
    >
      <div
        className={css({
          position: 'absolute',
          w: '242px',
          aspectRatio: '1',
          borderRadius: '50%',
          bg: 'cyan.9',
          top: '83px',
          left: '-82px',
          filter: 'blur(150px)',
        })}
      />
      <div
        className={css({
          position: 'absolute',
          w: '204px',
          aspectRatio: '1',
          borderRadius: '50%',
          bg: 'yellow.9',
          top: '407px',
          left: '200px',
          filter: 'blur(150px)',
        })}
      />
      <div
        className={css({
          position: 'absolute',
          w: '203px',
          aspectRatio: '1',
          borderRadius: '50%',
          bg: 'pink.9',
          top: '360px',
          left: '445px',
          filter: 'blur(150px)',
        })}
      />
      <div
        className={css({
          position: 'absolute',
          w: '172px',
          aspectRatio: '1',
          rounded: '50%',
          bg: 'purple.9',
          top: '9px',
          left: '273px',
          filter: 'blur(150px)',
        })}
      />
      <canvas
        ref={canvasRef}
        className={css({
          width: '100%',
          height: '100%',
          aspectRatio: '1',
        })}
      />
    </div>
  );
};
