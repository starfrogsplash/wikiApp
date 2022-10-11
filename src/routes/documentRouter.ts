require('dotenv').config('../.env')
import { Router } from "express";
import { fetchDocuments, fetchAllRevisions} from '../controllers/documentControllers'

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

export {
    documentRouter
}
