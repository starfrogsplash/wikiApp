
import getNextConnection from '../../knexConfig'

const fetchDocuments = async () => {
  const knex = getNextConnection()
  return await knex('document').select('title')
}

export {
    fetchDocuments
}