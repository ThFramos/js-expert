// Fibonacci : o próximo nº da sequencia é sempre a soma do atual com o anterior
//input :3
//0,1,1
//input : 5
// 0,1,1,2,3
const assert = require('assert')
const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const sinon = createSandbox();

; (async () => {

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )

    for (const sequencia of fibonacci.execute(3)) {

    }
    const expectedCallCount = 4;
    assert.strictEqual(spy.callCount, expectedCallCount)



  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )
    const expectedCallCount = 6;
    const results = [...fibonacci.execute(5)]
    assert.strictEqual(spy.callCount, expectedCallCount)
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, "os arrays não são iguais")

    const expectedResults = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(results, expectedResults, "os arrays não são iguais")



  }

})()