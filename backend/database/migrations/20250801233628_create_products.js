exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary(); // ID auto-incrementado
        table.string('nome').notNullable();
        table.decimal('preco', 10, 2).notNullable();
        table.text('descricao').nullable();
        table.integer('categoria_id').unsigned().nullable()
            .references('id').inTable('categories').onDelete('SET NULL');
        table.string('imagem').nullable();
        table.integer('quantidade').defaultTo(0);
        table.boolean('status').defaultTo(true); // true = ativo, false = inativo
        table.string('codigo_produto').unique().nullable();
        table.integer('user_id').unsigned().notNullable()
            .references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true); // created_at e updated_at
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
