import request from 'supertest'
import { app } from '../app'
import { globalSetUp } from './global-setup'

describe('documents', () => {
  let knex: any
  const database = 'wikiTest'

    beforeAll(async () => {
      knex = await globalSetUp(database)
    })

    afterAll((done) => {
      knex.destroy()
      done()
   })
  
    describe('documents endpoint', () => {
      it('GET /documents => should return list of all documents', async () => {
        const { body: documents, status } = await request(app).get(`/documents`)
        expect(documents.length).toEqual(3)
        expect(status).toEqual(200)
      })


    })
  })