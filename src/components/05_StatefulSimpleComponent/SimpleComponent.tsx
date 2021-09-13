import React, {
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';

export type SimpleComponentProps = {
  defaultMessage: string | undefined | null
};

const SimpleComponent = ({
  defaultMessage,
}: SimpleComponentProps) => {
  const [message, setMessage] = useState(defaultMessage || '');
  const [inputText, setInputText] = useState(defaultMessage || '');

  const updateInputText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (formEvent: FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault();

      setMessage(inputText);
    },
    [inputText],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {inputText}
        <input
          type="text"
          name="input"
          aria-label="user-input"
          value={inputText}
          onChange={updateInputText}
        />
        <button
          type="submit"
          name="submit"
        >
          Submit
        </button>
      </form>
      <div role="main">
        {message?.toUpperCase()}
      </div>
    </div>
  );
};

export default SimpleComponent;
