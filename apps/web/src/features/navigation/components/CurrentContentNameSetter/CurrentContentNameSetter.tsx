'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useSetCurrentContentName } from '../../states/currentContentName';

export type CurrentContentNameSetterProps = {
  name: string;
};

export const CurrentContentNameSetter = ({ name }: CurrentContentNameSetterProps): ReactNode => {
  const setName = useSetCurrentContentName();
  useEffect(() => {
    setName(name);
  }, [setName, name]);
  return null;
};
