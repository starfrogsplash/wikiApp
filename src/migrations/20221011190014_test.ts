import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('document', (table) => {
        table.increments('id').primary().unique()
        table.string('title', 50).notNullable().unique()
        table.string('content').notNullable()
        table.integer('revision').notNullable()
        table.dateTime('timeStamp').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      }).createTable('documentHistory', (table) => {
        table.increments('id').primary().unique()
        table.integer('documentId').unsigned()
        table.foreign('documentId').references('document.id').onDelete("CASCADE");
        table.string('title', 50).notNullable()
        table.string('content').notNullable()
        table.integer('revision').notNullable()
        table.dateTime('timeStamp').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('documentHistory').dropTable('document')
}
