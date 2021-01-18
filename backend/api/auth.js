const {authSecret} = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

module.exports = app => {
    const logIn = async (req,res) => {
        if(!req.body.login || !req.body.password){
            return res.status(400).json({err: 'Dados incompletos!'})
        }
        if(!validator.isEmail(req.body.login)){
            return res.status(400).json({err: 'Verifique o email!'})
        }
        const user = await app.db('users').where({
            login: req.body.login
        }).first();

        if(user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch){
                    return res.status(401).json({err: "Senha incorreta!"})
                }
                const payload = {id: user.id};
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    type_user: user.type_user,
                    picture: user.picture,
                    token: jwt.encode(payload, authSecret)
                })
            })
        } else {
            res.status(400).send('Usuário não cadastrado')
        }

    }
    return { logIn }
}