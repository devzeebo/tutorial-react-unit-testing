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
import SimpleComponent from './SimpleComponent';

xdescribe('components > nillable simple component', () => {
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
      message={this.message}
    />
  ));
}

function the_word_is_UPPERCASE(this: Context) {
  expect(screen.getByTestId('message')).toHaveTextContent('CAT');
}

function NOTHING_is_displayed(this: Context) {
  expect(screen.getByTestId('message')).toHaveTextContent('');
}
