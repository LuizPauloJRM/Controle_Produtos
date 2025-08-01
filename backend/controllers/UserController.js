const knex = require('../database');
const bcrypt = require('bcryptjs');

module.exports = {
    async register(req, res) {
        const { nome, email, senha, telefone, cpf } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
        }

        const emailExiste = await knex('users').where({ email }).first();
        if (emailExiste) {
            return res.status(400).json({ message: 'E-mail já está em uso.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            nome,
            email,
            senha: hashedPassword,
            telefone,
            cpf
        };

        const [id] = await knex('users').insert(novoUsuario);

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', id });
    }
};
