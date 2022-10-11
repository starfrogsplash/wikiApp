require('dotenv').config('../.env')
import { Router } from "express";
import { fetchDocuments, fetchAllRevisions, fetchLatest, findLatest, findOldestRecord, findRevision} from '../controllers/documentControllers'

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

export {
    documentRouter
}
