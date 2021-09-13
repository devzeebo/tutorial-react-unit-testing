import {
  useState,
  useCallback,
} from 'react';
import someAjaxFunction from './_someAjaxFunction';

export type UseCoinToss = [
  wins: number,
  losses: number,
  tossACoin: () => Promise<void>,
];

export default (): UseCoinToss => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const tossACoin = useCallback(
    () => someAjaxFunction()
      .then(() => setWins(wins + 1))
      .catch(() => setLosses(losses + 1)),
    [losses, wins],
  );

  return [
    wins,
    losses,
    tossACoin,
  ];
};
