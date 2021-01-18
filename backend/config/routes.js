const certificate = require("../api/certificate");

module.exports = app => {
    const multer = require("multer")
    const multerConfigChat = require("./multer/multer_chat")
    const multerConfigCert = require("./multer/multer_certificates");
    const multerConfigUsers = require("./multer/multer_users");
    app.post('/login', app.api.auth.logIn);

    app.get("/user/check/:login", app.api.client.checkMail)

    app.route("/users/clients")
        .post(multer(multerConfigUsers).single('picture'), app.api.client.save)
        .get(app.middlewares.passport.authenticate(), app.api.client.findAll)

    app.route("/users/client/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.client.findOne)
        .delete(app.api.client.deleteOne)
        .put(app.api.client.update)

    app.route("/users/adms")
        .post(app.api.adm.save)
        .get(app.api.adm.findAll)

    app.route("/users/adm/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.adm.findOne)
        .delete(app.api.adm.deleteOne)
        .put(app.api.adm.update)

    app.route("/users/providers")
        .post(multer(multerConfigUsers).single('picture'), app.api.provider.save)
        .get(app.middlewares.passport.authenticate(), app.api.provider.findAll)

    app.route("/users/provider/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.provider.findOne)
        .delete(app.api.provider.deleteOne)
        .put(app.api.provider.update)

    app.route("/services")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.services.save)
        .get(app.api.services.findAll)

    app.route("/service/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.services.findOne)
    // .put(app.api.services.update)

    app.route("/users/providers/services")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.service_provider.save)
        .get(app.api.service_provider.findAll)

    app.route("/provider-service?")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.service_provider.findOne)
        .delete(app.api.service_provider.deleteOne)

    app.route("/coments")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.coments.save)
        .get(app.api.coments.findAll)

    app.route("/coments/:id_provider")
        .get(app.api.coments.findAll)



    app.route("/coment/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.coments.findOne)


    app.route("/users/client/adresses")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.adresses.save)

    app.route("/users/client/:id/adresses")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.adresses.findAll)

    app.route("/users/client/adress/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.adresses.findOne)
        .delete(app.api.adresses.deleteOne)
        .put(app.api.adresses.update)


    app.route("/schedules")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.diary.findAll)
        .post(app.api.diary.save)

    app.route("/schedule/:id")
        .all(app.middlewares.passport.authenticate())
        .put(app.api.diary.update)
        .get(app.api.diary.findOne)
        .delete(app.api.diary.deleteOne)


    app.route("/chat")
        .all(app.middlewares.passport.authenticate())
        .post(multer(multerConfigChat).single('midia'), app.api.chat.save)
        .get(app.api.chat.findAll)
    
    app.route("/chat/contacts")
    .all(app.middlewares.passport.authenticate())
    .get(app.api.chat.findContacts)


    app.route("/chat/:id")
        .all(app.middlewares.passport.authenticate())
        .put(app.api.chat.update)

    app.route("/users/providers/certificates")
        .all(app.middlewares.passport.authenticate())
        .post(multer(multerConfigCert).single('certificate'), app.api.certificate.save)

    app.route("/users/providers/:id/certificates")
        .get(app.api.certificate.findAll)

    app.route("/users/providers/certificate/:id")
        .get(app.api.certificate.findOne)
        .delete(app.api.certificate.deleteOne)

    app.route("/products")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.product.save)
        .get(app.api.product.findAll)

    app.route("/product/:id")
        .all(app.middlewares.passport.authenticate())
        .put(app.api.product.update)
        .get(app.api.product.findOne)

    app.route("/os")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.os.save)
        .get(app.api.os.findAll)

    app.route("/os/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.os.findOne)

    app.route("/os/products")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.os.addProduct)
        .delete(app.api.os.removeProduct)
        .put(app.api.os.updateProduct)

    app.route("/os/:id/products")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.os.getProducts)


    app.route("/users/alterPassword")
        .all(app.middlewares.passport.authenticate())
        .put(app.api.client.alterPassword)

    app.route("/users/provider/alterPassword")
        .all(app.middlewares.passport.authenticate())
        .put(app.api.provider.alterPassword)

    app.route("/pay/os/:id")
        .post(app.api.pay.save)

    app.route("/pay/os")
        .post(app.api.pay.findOne)

    app.route("/users/provider/:id/working_yours")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.working_hours.findAll)


    app.route("/users/provider/working_yours/:id")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.working_hours.findOne)
        .put(app.api.working_hours.update)
        .delete(app.api.working_hours.deleteOne)


    app.route("/users/provider/working_yours")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.working_hours.save)

    app.route("/users/favorites")
        .all(app.middlewares.passport.authenticate())
        .get(app.api.client.getFavorites)

    app.route("/users/favorites/:id")
        .all(app.middlewares.passport.authenticate())
        .post(app.api.client.addFavorite)
        .delete(app.api.client.removeFavorite)

    
}  