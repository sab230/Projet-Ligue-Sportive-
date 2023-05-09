/*const passport = require('passport');
const passportJWT = require('passport-jwt');
const user = require('../models/model');


passport.use(
    new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "SECRET_KEY"
    },

        // permet d'afficher les erreurs, injecter l'utilisateur et permette l'accés aux routes protégés 
        function (jwtPayload, done) {
            return user.findById(jwtPayload.id)
                .then(user => {
                    return (null, user)
                })
                .catch(error => {
                    return done(error)
                })
        }
    )

)*/
