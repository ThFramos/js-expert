const { describe, it, beforeEach, afterEach } = require('mocha')
const CarService = require('../../src/service/carService')
const Transaction = require('../../src/entities/transaction')

const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')

const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustumer: require('./../mocks/valid-custumer.json')
}

describe('CarService Suite tests', () => {
    let carService = {}
    let sandbox = {}
    before(() => {
        carService = new CarService({
            cars: carsDatabase
        })
    })
    beforeEach(() => {
        sandbox = sinon.createSandbox()

    })
    afterEach(() => {
        sandbox.restore()
    })

    it('should retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4];

        const result = carService.getRandomPositionFromArray(data);

        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it('should choose the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCarCategory
        const carIdIndex = 0;

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex)

        const result = carService.chooseRandomCar(carCategory);
        const expected = carCategory.carIds[carIdIndex];

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
        expect(result).to.be.equal(expected)

    })

    it('given a carCategory it should return an available car', async () => {
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]



        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name,
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name,
        )

        const result = await carService.getAvailableCar(carCategory);
        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(result).to.be.deep.equal(expected)

    })

    it('given a carCategory, customer and numberOfDays it should calculate final amount in real', async () => {
        const custumer = Object.create(mocks.validCustumer)
        custumer.age = 50

        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.price = 37.6

        const numberOfDays = 5

        //age:50 - tax: 1.3 - categoryPrice: 37.6
        // 37.6 * 1.6 = 48.88 * 5 days = 244.4

        //não depender de dados externos
        sandbox.stub(
            carService,
            "taxesBasedOnAge"
        ).get(() => [{ from: 40, to: 50, then: 1.3 }])


        const expected = carService.currencyFormat.format(244.4)

        const result = carService.calculateFinalPrice(
            custumer,
            carCategory,
            numberOfDays
        )

        expect(expected).to.be.deep.equal(result)

    })

    it('given a custumer and car category it should return a transaction receipt', async () => {
        const car = mocks.validCar
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        }

        const customers = {
            ...mocks.validCustumer,
            age: 20
        }

        const numberOfDays = 5
        const dueDate = '10 de novembro de 2020'
        const now = new Date(2020, 10, 5)
        sandbox.useFakeTimers(now.getTime())

        //age: 20 , tax: 1.1, categoryPrice: 37.6
        // 37.6 * 1.1 = 41.36 * 5 days  = 206.8

        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        const expectedAmount = carService.currencyFormat.format(206.80)
        const result = await carService.rent(customers, carCategory, numberOfDays)

        const expected = new Transaction({
            customers,
            car,
            amount: expectedAmount,
            dueDate
        })

        expect(expected).to.be.deep.equal(result)

    })
})