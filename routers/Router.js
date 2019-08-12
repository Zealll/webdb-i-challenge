const db = require('../data/dbConfig')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    let {limit, sortby, sortdir} = req.query
    sortby = sortby || 'id'
    
    db('accounts')
    .limit(limit)
    .orderBy(sortby, sortdir)
    .then(accounts => res.status(200).json(accounts))
    .catch(err => res.status(500).json({message: 'Something went wrong with the server'}))
})

router.post('/', (req, res) => {
    const body = req.body

    db('accounts')
    .insert(body)
    .then(results => {
        db('accounts')
        .then(accounts  => res.status(200).json(accounts))
    })
    .catch(err => res.status(500).json({message: 'Something went wrong with the server'}))
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const body = req.body

    db('accounts')
    .where({id})
    .update(body)
    .then(updated => {
        db('accounts')
        .where({id})
        .first()
        .then(obj => res.status(200).json(obj))
        .catch(err => res.status(500).json({message: 'Something went wrong with the server'}))
    })
    .catch(err => res.status(500).json({message: 'Something went wrong with the server'}))
})

router.delete('/:id', (req, res) => {
    const {id} = req.params

    db('accounts')
    .where({id})
    .del()
    .then(obj => res.status(200).json(obj))
    .catch(err => res.status(500).json({message: 'Something went wrong with the server'}))
})


module.exports = router

