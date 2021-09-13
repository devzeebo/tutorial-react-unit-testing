/**
 * @jest-environment jsdom
 */
import test, {
  withAspect,
} from 'jest-gwt';
import { mocked } from 'ts-jest/utils';
import makeResolvable from 'resolvable-promise';
import {
  renderHook,
  act,
  RenderResult,
} from '@testing-library/react-hooks';
import { Resolvable } from 'src/types/resolvable';
import blockingAsyncAction from './_blockingAsyncAction';
import useAsyncEffect from './useAsyncEffect';

jest.mock('./_blockingAsyncAction');
const mocked_blockingAsyncAction = mocked(blockingAsyncAction);

xdescribe('components > use async effect', () => {
  test('listener fires when action resolves', {
    given: {
      listener,
    },
    when: {
      rendering_hook,
      action_resolves,
    },
    then: {
      listener_fires_ONCE,
    },
  });

  test('action only fires once if successful', {
    given: {
      listener,
    },
    when: {
      rendering_hook,
      action_resolves,
      rerendering_hook,
      action_resolves_again,
    },
    then: {
      listener_fires_ONCE,
      action_fired_ONCE,
    },
  });

  test('action fires again if it failed the first time', {
    given: {
      listener,
    },
    when: {
      rendering_hook,
      action_REJECTS,
      rerendering_hook,
      action_resolves,
    },
    then: {
      listener_fires_ONCE,
      action_fired_TWICE,
    },
  });

  withAspect(function (this: Context) {
    mocked_blockingAsyncAction.mockImplementation(() => {
      this.promise = makeResolvable();
      return this.promise;
    });
  });
});

type Context = {
  listener: jest.Mock<() => void>,
  hook: RenderResult<void>,
  rerender: (props?: HookProps) => void,
  promise: Resolvable<void>,
};
type HookProps = {
  listener_prop: () => void
};

function listener(this: Context) {
  this.listener = jest.fn();
}

function rendering_hook(this: Context) {
  const {
    result,
    rerender,
  } = renderHook(({
    listener_prop,
  }) => (
    useAsyncEffect(listener_prop)
  ), {
    initialProps: {
      listener_prop: this.listener,
    } as HookProps,
  });

  this.hook = result;
  this.rerender = rerender;
  expect(this.hook.error).toBeUndefined();
}

function rerendering_hook(this: Context) {
  this.rerender({
    listener_prop: jest.fn(),
  });
  expect(this.hook.error).toBeUndefined();
}

async function action_resolves(this: Context) {
  await act(() => {
    this.promise.resolve();
    return this.promise;
  });
}

async function action_REJECTS(this: Context) {
  await act(() => {
    this.promise.reject();
    return this.promise.catch(() => Promise.resolve());
  });
}

async function action_resolves_again(this: Context) {
  await act(() => {
    this.promise.resolve();
    return this.promise;
  });
}

function listener_fires_ONCE(this: Context) {
  expect(this.listener).toHaveBeenCalledTimes(1);
}

function action_fired_ONCE(this: Context) {
  expect(mocked_blockingAsyncAction).toHaveBeenCalledTimes(1);
}

function action_fired_TWICE(this: Context) {
  expect(mocked_blockingAsyncAction).toHaveBeenCalledTimes(2);
}
