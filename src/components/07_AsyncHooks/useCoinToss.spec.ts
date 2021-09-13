/**
 * @jest-environment jsdom
 */
import test from 'jest-gwt';
import { mocked } from 'ts-jest/utils';
import {
  renderHook,
  act,
  RenderResult,
} from '@testing-library/react-hooks';

import someAjaxFunction from './_someAjaxFunction';

import useCoinToss, {
  UseCoinToss,
} from './useCoinToss';

jest.mock('./_someAjaxFunction');
const mocked_someAjaxFunction = mocked(someAjaxFunction);

xdescribe('components > async hooks', () => {
  test('starts with zero wins and losses', {
    when: {
      rendering_hook,
    },
    then: {
      has_ZERO_wins,
      has_ZERO_losses,
    },
  });

  test('winning increases win count', {
    given: {
      coin_toss_is_WIN,
    },
    when: {
      rendering_hook,
      tossing_a_coin, // to your witcher
    },
    then: {
      has_ONE_win,
      has_ZERO_losses,
    },
  });

  test('losing increases lose count', {
    given: {
      coin_toss_is_LOSS,
    },
    when: {
      rendering_hook,
      tossing_a_coin, // to your witcher
    },
    then: {
      has_ZERO_wins,
      has_ONE_loss,
    },
  });
});

type Context = {
  hook: RenderResult<UseCoinToss>
};

function coin_toss_is_WIN(this: Context) {
  mocked_someAjaxFunction.mockReturnValue(Promise.resolve());
  // mocked_someAjaxFunction.mockResolvedValue(true);
}

function coin_toss_is_LOSS(this: Context) {
  mocked_someAjaxFunction.mockReturnValue(Promise.reject());
  // mocked_someAjaxFunction.mockRejectedValue(false);
}

function rendering_hook(this: Context) {
  const { result } = renderHook(() => (
    useCoinToss()
  ));

  this.hook = result;
}

function tossing_a_coin(this: Context) {
  act(() => {
    this.hook.current[2]();
  });
}

function has_ZERO_wins(this: Context) {
  expect(this.hook.current[0]).toBe(0);
}

function has_ONE_win(this: Context) {
  expect(this.hook.current[0]).toBe(1);
}

function has_ZERO_losses(this: Context) {
  expect(this.hook.current[1]).toBe(0);
}

function has_ONE_loss(this: Context) {
  expect(this.hook.current[1]).toBe(1);
}
