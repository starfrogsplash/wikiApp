import getNextConnection from '../../knexConfig'

const fetchDocuments = async () => {
  const knex = getNextConnection()
  return await knex('document').select('title')
}

const fetchLatest = async (title: string) => {
  const knex = getNextConnection()
  return await knex('document').where('title', title)
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

const findLatest = async (title: string, timeStamp: string) => {
  const knex = getNextConnection()
  return await knex('document')
    .select()
    .where('title', title)
    .where('timeStamp', '<=', timeStamp)
}

const findRevision = async (title: string, timeStamp: string) => {
  const knex = getNextConnection()
  return await knex('documentHistory')
    .select()
    .where('title', title)
    .where('timeStamp', '<=', timeStamp)
    .orderBy('revision', 'desc')
    .first()
}

const findOldestRecord = async (title: string) => {
  const knex = getNextConnection()
  return await knex('documentHistory')
    .select()
    .where('title', title)
    .orderBy('revision', 'asc')
    .first()
}

export {
    fetchDocuments,
    fetchAllRevisions,
    fetchLatest,
    findLatest,
    findRevision,
    findOldestRecord
}