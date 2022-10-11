require('dotenv').config('../.env')
import { Router } from "express";
import { fetchDocuments} from '../controllers/documentControllers'

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

export {
    documentRouter
}
