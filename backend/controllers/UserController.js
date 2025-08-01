const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database'); // Adicione o import do knex

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
    },

    async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const usuario = await knex('users').where({ email }).first();

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                is_admin: usuario.is_admin
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        delete usuario.senha;

        return res.json({ usuario, token });
    }
};