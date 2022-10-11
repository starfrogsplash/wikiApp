require('dotenv').config('../.env')
import { Router } from "express";
import { fetchDocuments, fetchAllRevisions, fetchLatest, findLatest, findOldestRecord, findRevision, insertRecord, updateRecord} from '../controllers/documentControllers'

const documentRouter = Router()

documentRouter.get('/documents', async (req, res) => {
    try {
        const titles = await fetchDocuments()
        req.log.info(titles, 'success')
        res.status(200).json(titles)
    } catch (error) {
        req.log.error(error)
        res.status(400).json('retreive failed')
    }
})

documentRouter.get('/documents/:title', async (req, res) => {
    const { title } = req.params

    try {
        const allRevisions = await fetchAllRevisions(title)
        req.log.info(allRevisions, 'success')
        res.status(200).json(allRevisions)

    } catch (error) {
        req.log.error(error)
        res.status(400).json('retreive failed')
    }
})

documentRouter.get('/documents/:title/latest', async (req, res) => {
    const { title } = req.params

    try {
        const titles = await fetchLatest(title)
        req.log.info(titles, 'success')
        res.status(200).json(titles)

    } catch (error) {
        req.log.error(error)
        res.status(400).json('retreive failed')
    }
})

documentRouter.get('/documents/:title/:timeStamp', async (req, res) => {
    const { title, timeStamp } = req.params

    try {
        const foundLatest = await findLatest(title, timeStamp)
        if (foundLatest.length > 0) {
            req.log.info('foundLatest', foundLatest)
            return res.status(200).json(foundLatest)
        } else {
            const foundRevision = await findRevision(title, timeStamp)
      
            if (foundRevision) {
                req.log.info('foundRevision', foundRevision)
                return res.status(200).json(foundRevision)
            } else {
                const oldestRecord = await findOldestRecord(title)
                return oldestRecord ? res.status(200).json(oldestRecord) : res.status(404).json('Not found')
            }
        }

    } catch (error) {
        req.log.error(error)
        res.status(400).json('retreive failed')
    }
})

documentRouter.post('/documents/:title', async (req, res) => {
    const { title } = req.params
    const { content } = req.body

    if(content.length === 0){
       return res.status(400).json('content cannot be empty!')
    }

    const existingRecords = await fetchLatest(title)

    if (existingRecords.length > 0) {
        try {
            const updated = await updateRecord(title, content, existingRecords)
            res.status(200).json(updated)
        } catch (error) {
            req.log.error(error)
            res.status(400).json('update failed')
        }

    } else {
        try {
            const record = await insertRecord(title, content)
            res.status(200).json(record)

        } catch (error) {
            req.log.error(error)
            res.status(400).json('insert failed')
        }
    }

})

export {
    documentRouter
}
