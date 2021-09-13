import {
  useState,
  useEffect,
} from 'react';

import blockingAsyncAction from './_blockingAsyncAction';

export default (
  listener: () => void,
) => {
  const [firing, setFiring] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(
    () => {
      if (!completed && !firing) {
        setFiring(true);
        blockingAsyncAction()
          .then(() => {
            setCompleted(true);
            setFiring(false);
            listener();
          })
          .catch(() => setFiring(false));
      }
    },
    [completed, firing, listener],
  );
};
