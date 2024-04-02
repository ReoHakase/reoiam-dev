import { GithubIcon } from 'lucide-react';
import { Briefcase, AtSign, Sparkle, Code, Menu, X } from 'lucide-react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { ThemeSelect } from '../ThemeSelect/ThemeSelect';
import { TopNavigationLink } from '../TopNavigation/TopNavigationLink';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerScrollArea,
  DrawerKnob,
  DrawerTitle,
  DrawerClose,
} from '@/components/Drawer/Drawer';
import { Image } from '@/components/Image/Image';
import { Link } from '@/components/Link/Link';
import HeaderIconImage from '@public/icon.webp';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * Renders a header.
 */
export const Header = ({ ...props }: HeaderProps): ReactNode => {
  return (
    <header
      className={flex({
        pos: 'sticky',
        w: '100%',
        top: '0',
        left: '0',
        zIndex: '100',
        direction: 'row',
        justify: 'space-between',
        align: 'center',
        p: '4',
        gap: '6',
      })}
      {...props}
    >
      <div
        className={flex({
          direction: 'row',
          justify: 'start',
          align: 'center',
          gap: '6',
        })}
      >
        <Link
          href="/"
          className={css({
            rounded: 'full',
            flexShrink: '0',
          })}
        >
          <Image
            src={HeaderIconImage}
            css={[
              {
                rounded: 'full',
                w: '12',
                h: '12',
                outlineColor: 'cyan.9',
                outlineWidth: '2',
                outlineStyle: 'solid',
                outlineOffset: '2px',

                flexShrink: '0',
              },
            ]}
            alt="An Icon of ReoHakase"
            sizes="48px"
            placeholder="blur"
          />
        </Link>
        <p
          className={css({
            rounded: 'sm',
            fontFamily: 'heading',
            maxW: '12rem',
            lineHeight: '1.25',
          })}
        >
          reoiam.dev
          <br />
          Reo HAKUTA
        </p>
      </div>
      <nav
        className={css({
          pos: 'absolute',
          w: 'fit-content',
          h: '12',
          top: '4',
          left: '0',
          right: '0',
          mx: 'auto',
          display: 'flex',
          rounded: 'xl',
          flexDir: 'row',
          bg: 'keyplate.a.3',
          p: '1',
          backdropFilter: 'blur(8px) saturate(130%)',
          mdDown: {
            display: 'none',
          },
        })}
      >
        <TopNavigationLink href="/docs/resume">
          <Briefcase /> Resume
        </TopNavigationLink>
        <TopNavigationLink href="/docs/works">
          <Sparkle /> Works
        </TopNavigationLink>
        <TopNavigationLink href="/docs/contacts">
          <AtSign /> Contacts
        </TopNavigationLink>
      </nav>
      <div
        className={flex({
          direction: 'row',
          justify: 'end',
          align: 'center',
          grow: '1',
          gap: '2',
        })}
      >
        <ThemeSelect />
        <Link
          href="https://github.com/ReoHakase"
          external
          referrerPolicy="no-referrer"
          className={flex({
            fontFamily: 'heading',
            px: '4',
            py: '2',
            smDown: {
              p: '3',
            },
            gap: '1',
            direction: 'row',
            align: 'center',
            bg: 'keyplate.12',
            color: 'keyplate.1',
            rounded: 'full',
          })}
        >
          <GithubIcon
            className={css({
              display: 'inline',
              w: '4',
              h: '4',
            })}
          />
          <span className={css({ smDown: { srOnly: true } })}>Open GitHub</span>
        </Link>
        <Drawer direction={'right'}>
          <DrawerTrigger asChild>
            <button
              aria-label="Open menu"
              type="button"
              className={flex({
                fontFamily: 'heading',
                p: '3',
                direction: 'row',
                justifyContent: 'center',
                align: 'center',
                rounded: 'full',
                bg: 'keyplate.a.3',
                backdropFilter: 'blur(8px) saturate(130%)',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'keyplate.a.1',
              })}
            >
              <Menu
                className={css({
                  display: 'inline',
                  w: '4',
                  h: '4',
                })}
              />
            </button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent
              className={css({
                pt: '8',
                pl: '0',
                _light: {
                  bg: 'keyplate.1',
                },
                _dark: {
                  bg: 'keyplate.a.3',
                  backdropFilter: 'blur(12px) saturate(140%) brightness(50%)',
                },
              })}
            >
              <DrawerClose asChild>
                <button
                  aria-label="Close menu"
                  type="button"
                  className={flex({
                    fontFamily: 'heading',
                    w: '12',
                    h: '12',
                    direction: 'row',
                    justifyContent: 'center',
                    align: 'center',
                    rounded: 'full',
                    cursor: 'pointer',
                  })}
                >
                  <X />
                </button>
              </DrawerClose>
              <DrawerKnob />
              <DrawerScrollArea>
                <DrawerTitle>Menu</DrawerTitle>
                <nav
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignItems: 'stretch',
                    textDecoration: 'underline',
                  })}
                >
                  <TopNavigationLink href="/docs/resume">
                    <Briefcase /> Resume
                  </TopNavigationLink>
                  <TopNavigationLink href="/docs/works">
                    <Sparkle /> Works
                  </TopNavigationLink>
                  <TopNavigationLink href="/docs/contacts">
                    <AtSign /> Contacts
                  </TopNavigationLink>
                  <TopNavigationLink href="/api/swagger" target="_blank">
                    <Code /> API Reference
                  </TopNavigationLink>
                </nav>
              </DrawerScrollArea>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    </header>
  );
};
