/**
 * @jest-environment jsdom
 */
import test from 'jest-gwt';
import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SimpleComponent from './SimpleComponent';

xdescribe('components > updating simple component', () => {
  test('uppercases the word', {
    given: {
      a_word,
    },
    when: {
      rendering_the_component,
    },
    then: {
      the_word_is_UPPERCASE,
    },
  });

  test('message is optional', {
    given: {
      NIL_message,
    },
    when: {
      rendering_the_component,
    },
    then: {
      NOTHING_is_displayed,
    },
  });

  test('updating the message changes the screen', {
    given: {
      a_word,
    },
    when: {
      rendering_the_component,
      updating_the_message,
    },
    then: {
      NEW_message_is_displayed,
    },
  });
});

type Context = {
  message: string,
};

function a_word(this: Context) {
  this.message = 'cat';
}

function NIL_message(this: Context) {
  this.message = null as any;
}

function rendering_the_component(this: Context) {
  render((
    <SimpleComponent
      defaultMessage={this.message}
    />
  ));
}

function updating_the_message(this: Context) {
  const textBox = screen.getByRole('textbox', { name: /^user-input$/i });

  userEvent.clear(textBox);

  userEvent.type(
    textBox,
    'dog',
  );

  userEvent.click(screen.getByRole('button', { name: /^submit$/i }));
}

function the_word_is_UPPERCASE(this: Context) {
  expect(screen.getByRole('main')).toHaveTextContent('CAT');
}

function NOTHING_is_displayed(this: Context) {
  expect(screen.getByRole('main')).toHaveTextContent('');
}

function NEW_message_is_displayed(this: Context) {
  expect(screen.getByRole('main')).toHaveTextContent('DOG');
}
