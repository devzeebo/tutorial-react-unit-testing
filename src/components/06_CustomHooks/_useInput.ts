import {
  useState,
  useCallback,
  ChangeEvent,
} from 'react';

export type UseInput = [
  inputText: string,
  setInputText: (event: ChangeEvent<HTMLInputElement>) => void,
];

export default (
  defaultValue: string | undefined | null,
): UseInput => {
  const [inputText, setInputText] = useState(defaultValue || '');

  const updateInputText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
    },
    [],
  );

  return [
    inputText,
    updateInputText,
  ];
};
