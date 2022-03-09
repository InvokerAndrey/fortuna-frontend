export default class Enum {
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
