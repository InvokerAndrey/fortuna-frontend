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
        PLAYER_TO_ADMIN_PROFIT: {id: 2, verbose: 'Profit from gambling'},
        ADMIN_TO_PLAYER_SALARY: {id: 3, verbose: 'Player salary'},
    }

    static get ADMIN_TO_PLAYER_GAME() {
        return this.obj.ADMIN_TO_PLAYER_GAME.id
    }

    static get PLAYER_TO_ADMIN_PROFIT() {
        return this.obj.PLAYER_TO_ADMIN_PROFIT.id
    }

    static get ADMIN_TO_PLAYER_SALARY() {
        return this.obj.ADMIN_TO_PLAYER_SALARY.id
    }
}
