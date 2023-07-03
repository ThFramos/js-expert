const Base = require("./base/base")
class Carcategory extends Base{

    constructor({id, name, carIds, price }){
        super({ id, name })
        this.carIds = carIds
        this.price = price
    }


}

module.exports = Carcategory;