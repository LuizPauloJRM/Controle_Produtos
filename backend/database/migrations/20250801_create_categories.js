exports.up = function (knex) {
    return knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable().unique();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('categories');
};
