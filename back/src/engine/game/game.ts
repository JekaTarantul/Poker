import { Player } from '../player/player';

export abstract class Game {
  private players: Player[];

  onPlayerJoined(player: Player): void {
    // в будущем посадить на большой блайнд
    this.players.push(player);
  }

  onPlayerLeft(playerId: number): void {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  abstract onRoundStarted(): void;

  abstract onRoundEnded(): any;
}
