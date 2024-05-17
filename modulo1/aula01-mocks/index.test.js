const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require('assert')

  //IEEF
  ; (async () => {


    {
      const filePath = './mocks/emptyFile-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJson(filePath);
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/invalid-hear.csv'
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result = File.csvToJson(filePath);
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/fiveItems-valid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJson(filePath);
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/threeItems-valid.csv'
      const expected = [
        {
          id: 123,
          name: "Thiago",
          profession: "Junior developer",
          age: 37
        },
        {
          id: 322,
          name: "Maria Jose",
          profession: "Java Senior developer",
          age: 25
        },
        {
          id: 321,
          name: "José Maria",
          profession: "Java Senior developer",
          age: 25
        }
      ]
      const result = await File.csvToJson(filePath);
      assert.deepEqual(result, expected)
    }
  })()