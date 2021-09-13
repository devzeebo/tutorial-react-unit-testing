/**
 * @jest-environment jsdom
 */
import test from 'jest-gwt';
import {
  renderHook,
  act,
  RenderResult,
} from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import useInput, {
  UseInput,
} from './_useInput';

xdescribe('components > custom hooks > use input', () => {
  test('defaults to empty string', {
    given: {
      NO_default_value,
    },
    when: {
      rendering_hook,
    },
    then: {
      input_text_is_EMPTY_STRING,
    },
  });

  test('initial value is default value', {
    given: {
      default_value,
    },
    when: {
      rendering_hook,
    },
    then: {
      input_text_is_DEFAULT_VALUE,
    },
  });

  test('calling callback updates value', {
    given: {
      default_value,
    },
    when: {
      rendering_hook,
      updating_value,
    },
    then: {
      input_text_is_NEW_VALUE,
    },
  });
});

type Context = {
  default_value: string | undefined | null,
  hook: RenderResult<UseInput>
};

function NO_default_value(this: Context) {
  this.default_value = undefined;
}

function default_value(this: Context) {
  this.default_value = 'cat';
}

function rendering_hook(this: Context) {
  const { result } = renderHook(() => (
    useInput(this.default_value)
  ));

  this.hook = result;
}

function updating_value(this: Context) {
  const event = { target: { value: 'dog' } } as Partial<ChangeEvent<HTMLInputElement>>;
  act(() => {
    this.hook.current[1](event as ChangeEvent<HTMLInputElement>);
  });
}

function input_text_is_EMPTY_STRING(this: Context) {
  expect(this.hook.current[0]).toBe('');
}

function input_text_is_DEFAULT_VALUE(this: Context) {
  expect(this.hook.current[0]).toBe('cat');
}

function input_text_is_NEW_VALUE(this: Context) {
  expect(this.hook.current[0]).toBe('dog');
}
