const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

import countEntitites from "../../lib/count-entities"

describe('@datagica/count-entities', () => {

  describe('counting entities in the text', () => {
    it('should work', done => {

      const tests = [
        {
          "input": [ "foo" , "bar", "bar" ],
          "output": [
            {
              id: 'foo',
              value: 'foo',
              count: 1
            },
            {
              id: 'bar',
              value: 'bar',
              count: 2
            }
          ]
        },
        {
          "input": [
            {
              "id": "1",
              "name": "foo"
            },
            {
              "id": "2",
              "name": "bar"
            },
            {
              "id": "2",
              "name": "bar"
            }
          ],
          "output": [
            {
              id: "1",
              value: {
                "id": "1",
                "name": "foo"
              },
              count: 1
            },
            {
              id: "2",
              value: {
                "id": "2",
                "name": "bar"
              },
              count: 2
            }
          ]
        }
    ]
      Promise.all(tests.map(test => {
        return countEntitites(test.input).then(output => {
          console.log("actual output: " + JSON.stringify(output))
          console.log("expected output: " + JSON.stringify(test.output))
          expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(ended => {
        console.log(`test ended`)
        done()
        return true
      }).catch(exc => {
        console.error(exc)
      })
    })


  })

})
