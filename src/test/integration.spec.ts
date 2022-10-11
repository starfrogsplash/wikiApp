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

      it('GET /documents/:title => should return 2 entries of `game of thrones and its revisions`', async () => {
        const { body: documents, status } = await request(app).get(`/documents/A Game of Thrones`)
        expect(documents.length).toEqual(2)
        expect(documents[0].title).toEqual('A Game of Thrones')
        expect(status).toEqual(200)
      })

      it('GET /documents/:title => should return empty [] where document does not exist', async () => {
        const { body: documents, status } = await request(app).get(`/documents/what`)
        expect(documents).toEqual([])
        expect(status).toEqual(200)
      })

      it('GET /documents/:title/:latest => should return latest version of `game of thrones`', async () => {
        const { body: documents, status } = await request(app).get(`/documents/A Game of Thrones/latest`)
        console.log(documents)
        expect(documents.length).toEqual(1)
        expect(documents[0].title).toEqual('A Game of Thrones')
        expect(documents[0].revision).toEqual(2)
        expect(status).toEqual(200)
      })

      it('GET /documents/:title/:timeStamp => should return latest version of `game of thrones`', async () => {
        const { body: document, status } = await request(app).get(`/documents/A Game of Thrones/2022-10-10T21:20:24.790Z`)
        console.log(document)
        expect(document.revision).toEqual(1)
        expect(status).toEqual(200)
      })

      it('GET /documents/:title/:timeStamp => should not status return 404 not found', async () => {
        const res = await request(app).get(`/documents/big baby boo/2022-10-10T21:20:24.790Z`)
        expect(res.text).toEqual("\"Not found\"")
        expect(res.status).toEqual(404)
      })

      it('POST /documents/:title => should insert new wiki entry of `Geoffry`', async () => {
        const { body: document, status } = await request(app)
          .post(`/documents/Geoffry`)
          .send({content: 'this is a new entry'})

        expect(document[0].revision).toEqual(1)
        expect(document[0].title).toEqual('Geoffry')
        expect(status).toEqual(200)
      })

      it('POST /documents/:title => should return 400 as content cannot be empty', async () => {
        const res = await request(app)
          .post(`/documents/Geoffry`)
          .send({content: ''})

          expect(res.text).toEqual("\"content cannot be empty!\"")
          expect(res.status).toEqual(400)
      })


    })
  })