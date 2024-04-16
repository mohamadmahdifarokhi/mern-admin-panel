const express = require('express');
const router = express.Router();
const Token = require('../../models/Token');

router.post('/token-add', (req, res) => {
    const newToken = new Token({
        token: req.body.token,
        email: req.body.email,
        expired_at: req.body.expired_at
    });
    newToken
        .save()
        .then(token => {
            return res.status(200).json({message: 'Token added successfully. Refreshing data...'})
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({message: 'Failed to add token.'});
        });
});

router.post('/token-data', (req, res) => {
    Token.find({}).then(tokens => {
        return res.status(200).send(tokens);
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({message: 'Failed to retrieve tokens.'});
    });
});

router.post('/token-delete', (req, res) => {
    Token.deleteOne({ _id: req.body._id}).then(token => {
        return res.status(200).json({message: 'Token deleted successfully. Refreshing data...', success: true})
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({message: 'Failed to delete token.'});
    });
});

module.exports = router;
