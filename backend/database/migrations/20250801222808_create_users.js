exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.string('senha').notNullable();
        table.string('telefone');
        table.string('cpf');
        table.string('foto_perfil');
        table.boolean('is_admin').defaultTo(false);
        table.timestamps(true, true); // created_at e updated_at
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
