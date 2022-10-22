import { Player } from 'src/engine/player/player';

export type RoundResult = {
  bankIncrease: number;
  playersInGame: Player[];
};
