const knex = require('../database');

module.exports = {
    async index(req, res) {
        try {
            const categorias = await knex('categories').select('*').orderBy('nome');
            return res.json(categorias);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar categorias.' });
        }
    },

    async store(req, res) {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
        }

        try {
            // Verifica se o usuário é admin
            if (!req.user.is_admin) {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem criar categorias.' });
            }

            // Verifica se já existe categoria com esse nome
            const existe = await knex('categories').where('nome', nome).first();
            if (existe) {
                return res.status(400).json({ message: 'Categoria já existe.' });
            }

            const [id] = await knex('categories').insert({ nome });
            return res.status(201).json({ message: 'Categoria criada com sucesso.', id });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar categoria.' });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
        }

        try {
            if (!req.user.is_admin) {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem editar categorias.' });
            }

            const categoria = await knex('categories').where({ id }).first();
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada.' });
            }

            await knex('categories').where({ id }).update({ nome, updated_at: knex.fn.now() });
            return res.json({ message: 'Categoria atualizada com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar categoria.' });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            if (!req.user.is_admin) {
                return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir categorias.' });
            }

            const categoria = await knex('categories').where({ id }).first();
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada.' });
            }

            await knex('categories').where({ id }).del();
            return res.json({ message: 'Categoria excluída com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir categoria.' });
        }
    }
};
