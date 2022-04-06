class Enum {
    static obj = {}

    static getVerboseById(id) {
        for (let attr in this.obj) {
            if (this.obj.hasOwnProperty(attr) && this.obj[attr].id === id) {
                return this.obj[attr].verbose
            }
        }
        return null
    }

    static getIdList() {
        let idList = []
        for (let attr in this.obj) {
            if (this.obj.hasOwnProperty(attr)) {
                idList.push(this.obj[attr].id)
            }
        }
        return idList
    }
}


export class RoomTransactionTypeEnum extends Enum {
    static obj = {
        PLAYER_TO_ROOM: {id: 1, verbose: 'Deposit'},
        ROOM_TO_PLAYER: {id: 2, verbose: 'Withdrawal'},
    }

    static get PLAYER_TO_ROOM() {
        return this.obj.PLAYER_TO_ROOM.id
    }

    static get ROOM_TO_PLAYER() {
        return this.obj.ROOM_TO_PLAYER.id
    }
}


export class PlayerTransactionTypeEnum extends Enum {
    static obj = {
        ADMIN_TO_PLAYER_GAME: {id: 1, verbose: 'For gambling'},
        PLAYER_TO_ADMIN_DUTY: {id: 2, verbose: 'Makeup payback'},
        PLAYER_TO_ADMIN_PROFIT: {id: 3, verbose: 'Profit withdrawal'}
    }

    static get ADMIN_TO_PLAYER_GAME() {
        return this.obj.ADMIN_TO_PLAYER_GAME.id
    }

    static get PLAYER_TO_ADMIN_DUTY() {
        return this.obj.PLAYER_TO_ADMIN_DUTY.id
    }

    static get PLAYER_TO_ADMIN_PROFIT() {
        return this.obj.PLAYER_TO_ADMIN_PROFIT.id
    }
}


export class FundTransactionTypeEnum extends Enum {
    static obj = {
        DEPOSIT: {id: 1, verbose: 'Deposit'},
        WITHDRAWAL: {id: 2, verbose: 'Withdrawal'},
    }

    static get DEPOSIT() {
        return this.obj.DEPOSIT.id
    }

    static get WITHDRAWAL() {
        return this.obj.WITHDRAWAL.id
    }
}
