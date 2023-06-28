
const faker = require("faker")
const Car = require("../src/entities/car")
const CarCategory = require("../src/entities/carCategory")
const Custumer = require("../src/entities/custumer")
const { writeFile } = require('fs/promises')
const { join } = require("path");

const seederBaseFolder = join(__dirname, "../", "database");

const ITENS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
});

const cars = []
const custumers= []
for (let index = 0; index <= ITENS_AMOUNT; index++) {
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })
    carCategory.carIds.push(car.id)
    cars.push(car)

    const custumer = new Custumer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({min:18, max:50})
    })

    custumers.push(custumer)
}

const write = (fileName,data) => writeFile(join(seederBaseFolder,fileName), JSON.stringify(data));

;(async()=>{
    await write('cars.json',cars)
    await write('custumers.json',custumers)
    await write('carCategory.json',[carCategory])

    console.log('cars',cars)
    console.log('custumers',custumers)
    console.log('carCategory',carCategory)
})()


