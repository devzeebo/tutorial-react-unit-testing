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

describe('components > simple component', () => {
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
});

type Context = {
  message: string,
};

function a_word(this: Context) {
  this.message = 'cat';
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
