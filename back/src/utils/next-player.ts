import {Player} from "../engine/player/player";

export function getNextPlayer(players: Player[], activePlayer: Player): Player {
    const activePlayerIndex  = this.players.findIndex(player => player.id === activePlayer.id);

    if (activePlayerIndex === players.length - 1) {
        return players[0];
    } else {
        return players[activePlayerIndex];
    }
}
