import {toNegative} from "../../utils/numbers";

export class Player {
    id: number;
    bank: number;

    // спорный момент
    currentBet: number;

    check(): void {
        return;
    }

    bet(value: number): number {
        this.updateBank(toNegative(value));

        return value;
    }

    fold(): void {
        return;
    }

    updateBank(value: number) {
        this.bank += value;
    }
}