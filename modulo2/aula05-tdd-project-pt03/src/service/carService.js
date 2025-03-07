const BaseRepository = require("../repository/base/baseRepository");
const Tax = require("../../src/entities/tax");
const Transaction = require("../entities/transaction");

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
        this.taxesBasedOnAge = Tax.taxesBasedOnAge
        this.currencyFormat = new Intl.NumberFormat('pt-br',
            {
                style: 'currency',
                currency: 'BRL'
            }
        )
    }

    getRandomPositionFromArray(list) {
        const listLength = list.length;
        return Math.floor(
            Math.random() * (listLength)
        )
    }

    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
        const carId = carCategory.carIds[randomCarIndex];

        return carId;
    }

    async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory);

        const car = await this.carRepository.find({ itemId: carId });


        return car;
    }

    calculateFinalPrice(custumer, carCategory, numberOfDays) {
        const { age } = custumer
        const { price } = carCategory
        const { then: tax } = this.taxesBasedOnAge
            .find(tax => age >= tax.from && age <= tax.to);

        const finalPrice = ((tax * price) * (numberOfDays));
        const formattedPrice = this.currencyFormat.format(finalPrice)

        return formattedPrice

    }

    async rent(customers, carCategory, numberOfDays) {

        const car = await this.getAvailableCar(carCategory);
        const finalPrice = await this.calculateFinalPrice(customers, carCategory, numberOfDays)

        const today = new Date();
        today.setDate(today.getDate() + numberOfDays)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        const dueDate = today.toLocaleDateString("pt-br", options)

        const transaction = new Transaction({
            customers,
            car,
            amount: finalPrice,
            dueDate

        })

        return transaction

    }
}

module.exports = CarService;