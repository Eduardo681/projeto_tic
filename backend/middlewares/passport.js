const { authSecret } = require('../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt} = passportJwt; 


module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    }
    const strategy = new Strategy(params, (payload, done) => {
        app.db.select("*").table('users').where({
            id: payload.id
        })
        .first()
        .then(user => {
            if(user){
                done(null, {id: user.id, email: user.login, type: user.type_user, picture: user.picture});
            } else {
                done(null, false)
            }
        })
        .catch(err => done(err,false))
    })

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}