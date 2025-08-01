const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

// Rotas públicas
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rota protegida - perfil do usuário logado
router.get('/me', auth, async (req, res) => {
    try {
        const knex = require('../database');
        const usuario = await knex('users')
            .where({ id: req.user.id })
            .select('id', 'nome', 'email', 'telefone', 'cpf', 'is_admin', 'foto_perfil')
            .first();

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.json({ usuario });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar perfil.' });
    }
});

module.exports = router;
