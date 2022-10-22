const defaultDeck: string[] = [
    '2♠', '2♣', '2♥', '2♦',
    '3♠', '3♣', '3♥', '3♦',
    '4♠', '4♣', '4♥', '4♦',
    '5♠', '5♣', '5♥', '5♦',
    '6♠', '6♣', '6♥', '6♦',
    '7♠', '7♣', '7♥', '7♦',
    '8♠', '8♣', '8♥', '8♦',
    '9♠', '9♣', '9♥', '9♦',
    '10♠', '10♣', '10♥', '10♦',
    'J♠', 'J♣', 'J♥', 'J♦',
    'Q♠', 'Q♣', 'Q♥', 'Q♦',
    'K♠', 'K♣', 'K♥', 'K♦',
    'A♠', 'A♣', 'A♥', 'A♦'
];

export class Deck {
  getDeck() {
    return [...defaultDeck];
  }

  getRandomCards(cardCount: number): string[] {
    const seenIndexes = new Set<number>();

    const deck = this.getDeck();
    const result = [];

    cardCount = this.validateCardCount(cardCount, deck.length);

    while (result.length < cardCount) {
      const index = Math.floor(Math.random() * deck.length);

      if (!seenIndexes.has(index)) {
        seenIndexes.add(index);

        result.push(deck[index]);
      }
    }

    return result;
  }

  private validateCardCount(cardCount: number, deckLength: number): number {
      if (cardCount > deckLength) {
          return deckLength;
      }

      return cardCount;
  }
}
