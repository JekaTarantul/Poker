import { Player } from '../player/player';
import {Game} from "../game/game";

export class Table {
  private players: Player[];
  private currentGame: Game;

  onPlayerJoined(player: Player): void {
    // в будущем посадить на большой блайнд
    this.players.push(player);
  }

  onPlayerLeft(playerId: number): void {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  // onRoundStarted(players: Player): void;
  //
  // onRoundEnded(): any;

  // startGame(): any {
  //
  // };
  //
  // onGameEnded(): any {
  //   const gameResult = this.currentGame.getGameResult();
  //
  // }
}
