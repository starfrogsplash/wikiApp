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

const insertRecord = async (title: string, content: string) => {
  const knex = getNextConnection()
  return await knex('document').insert({
    title,
    content,
    revision: 1
  }, ['id', 'title', 'revision', 'timeStamp', 'content'])
}


const updateRecord = async (title: string, content: string, existingRecords: any) => {
  const knex = getNextConnection()
  const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
 let result: any[] = []
  try {
    await knex.transaction(async trx => {
      const insertRevision = await trx('documentHistory').insert({
        title: existingRecords[0].title,
        content: existingRecords[0].content,
        documentId: existingRecords[0].id,
        revision: existingRecords[0].revision,
        timeStamp: existingRecords[0].timeStamp
      })

      result = await trx('document').where('title', title).update({
        content,
        revision: existingRecords[0].revision + 1,
        timeStamp: currentTime
      }, ['id', 'title', 'revision', 'timeStamp', 'content'])

    })
  } catch (error) {
    console.log('error:', error)
  }

  return result
}

export {
    fetchDocuments,
    fetchAllRevisions,
    fetchLatest,
    findLatest,
    findRevision,
    findOldestRecord,
    updateRecord,
    insertRecord
}