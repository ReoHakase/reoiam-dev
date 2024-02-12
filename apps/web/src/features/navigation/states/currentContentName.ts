import { atom, useAtomValue, useSetAtom } from 'jotai';

/**
 * A Jotai atom representing the current content name.
 */
const currentContentNameAtom = atom<string | null>(null);

export const useCurrentContentNameValue = () => {
  const currentContentName = useAtomValue(currentContentNameAtom);
  return currentContentName;
};

export const useSetCurrentContentName = () => {
  const setCurrentContentName = useSetAtom(currentContentNameAtom);
  return setCurrentContentName;
};
