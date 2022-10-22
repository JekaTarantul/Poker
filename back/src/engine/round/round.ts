import { Player } from '../player/player';
import { getNextPlayer } from '../../utils/next-player';
import { RoundResult } from '../../types/shared-types';

export abstract class Round {
  bank: number;
  activePlayer: Player;

  players: Player[];

  minBet: number;

  endRound(): RoundResult {
    return {
      playersInGame: this.players,
      bankIncrease: this.bank,
    };
  }

  onBet(value: number): any {
    this.bank += value;

    this.updateMinBet(value);
    this.updateActivePlayer();
  }

  // фолдануть может и активный игрок и неактивный
  onFold(playerId: number): void {
    if (playerId === this.activePlayer.id) {
      const nextPlayer = getNextPlayer(this.players, this.activePlayer);

      this.removePlayer(this.activePlayer.id);
      this.updateActivePlayer(nextPlayer);
    }

    if (playerId !== this.activePlayer.id) {
      this.removePlayer(playerId);
    }
  }

  private updateActivePlayer(player?: Player): void {
    player = player || getNextPlayer(this.players, this.activePlayer);

    this.activePlayer = player;
  }

  private removePlayer(playerId: number): void {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  private updateMinBet(value: number): void {
    if (value > this.minBet) {
      this.minBet = value;
    }
  }
}
