const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');

// Listar todas categorias — público
router.get('/', CategoryController.index);

// Criar categoria — só admin
router.post('/', auth, CategoryController.store);

// Atualizar categoria — só admin
router.put('/:id', auth, CategoryController.update);

// Deletar categoria — só admin
router.delete('/:id', auth, CategoryController.delete);

module.exports = router;
