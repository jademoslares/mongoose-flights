const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');


router.get('/flights/:id/tickets/new', ticketsCtrl.index);

router.post('/flights/:id/tickets', ticketsCtrl.create);

router.delete('/ticket/:id', ticketsCtrl.delete);


module.exports = router;
