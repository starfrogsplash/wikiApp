import getNextConnection from '../../knexConfig'

const fetchDocuments = async () => {
  const knex = getNextConnection()
  return await knex('document').select('title')
}

const fetchAllRevisions = async (title: string) => {
  const knex = getNextConnection()

  const docResult = await knex.select('*')
    .from('document')
    .where('document.title', title)

  const docHistory = await knex.select('*')
    .from('documentHistory')
    .where('documentHistory.title', title)

  return [
    ...docResult,
    ...docHistory
  ].sort((a, b) => b.revision - a.revision)

}

export {
    fetchDocuments,
    fetchAllRevisions
}