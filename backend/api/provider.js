const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {

        obterHash(req.body.password, async hash => {
            if(req.body.password.length < 3 || req.body.password.length > 20){
                res.status(400).json({err: "Senha deve conter de 4 a 20 caracteres!"})
                return;
            }

            const password = hash;
            const {sex, marital_status, login, birth, username, type_user, cpf_cnpj, rg, street, n_house, neighborhood, zip_code, city, uf, complement, company, status_login, status_active, validate, bank_agency, bank_account, n_bank, name_bank,boost, name_mom } = req.body;
            let picture;
            req.file ? picture = req.file.filename : false;
            if(!validator.isEmail(login)){
                console.log('aqui')
                res.status(400).json({err: "Email inválido!"})
                return;
            }
            if(username.length < 3 || username.length > 50){
                res.status(400).json({err: "Nome de usuário deve conter de 3 a 50 caracteres!"})
                return;
            }
            try {
                await app.db.transaction(async trans => {
                    await app.db('users').insert({
                        login,
                        password,
                        type_user,
                        create_at: new Date(),
                        birth,
                        username,
                        cpf_cnpj,
                        rg,
                        street,
                        n_house,
                        neighborhood,
                        zip_code,
                        city,
                        uf,
                        complement,
                        picture: picture ? `/uploads/profile_photos/${picture}` : null,
                        company,
                        status_login,
                        status_active,
                        checked: false,
                        sex,
                        marital_status
                    })
                    let lastID = await app.db.select("id").table("users").first().orderBy("id", "DESC");
                    await app.db('providers').insert({ id: lastID.id, validate, bank_agency, bank_account, n_bank, name_bank, boost, name_mom})
                })
                res.status(204).send()
                const nodemailer = require('nodemailer');
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "severinotic.adm@gmail.com",
                        pass: ""
                    },
                });
            
            
                const mailOptions = {
                    from: 'Severino',
                    to: login,
                    subject: 'Confirmação de conta',
                    html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body style="color: #000; text-align: center;">
                            <img src='https://uploaddeimagens.com.br/images/002/799/818/original/logo-severino.png?1595980076' style="width: 50px;" />
                        <p style="color: black" >
                            Olá ${username}. Obrigado por fazer parte do Severino! <br>
                            Para a confirmação de seu e-mail basta clicar no link a seguir: <br>
                            <a style='color: #000;' href="http://localhost:2000/user/provider/check/${login}"">Confirmar e-mail!! </a>
                        </p>
                        <p style="color: black" style='font-weight: bold;'>
                            Seja bem-vindo(a) :), <br>
                            - Equipe Severino
                        </p>
                        <hr>
                        <p style="color: #000"; decoration: none >
                            Fale conosco<br>
                            Tel: (16) 99238-8972 || E-mail: severinotic.adm@gmail.com
                        </p>
                    </body>
                    </html>
                    `
                };
            
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            catch (err) {
                if(err.code == 23505){
                    res.status(400).json({err: "Email já cadastrado!"})
                    return;
                }
                console.log(err)

                res.status(500).json(err);
            }
        })
    }

    const findAll = async (req,res) => {
        try{
            const providers = await app.db.select("*").table("providers").innerJoin("users", "providers.id","users.id")
            res.status(200).json({providers})
        }
        catch(err){
            console.log(err)
            res.status(500).json({err: err})
        }
    }

    const findOne = async (req,res) => {
        const id =  req.params.id;
        if(isNaN(id)){
            res.status(400).json({err: "ID invalido!"})
        }
        try{
            const provider = await app.db.select("*").table("providers").innerJoin("users", "providers.id","users.id").where("providers.id", id);
            if(provider === undefined || provider.length === 0){
                res.status(404).json({err: "Prestador não encontrado!"})
            } else {
                res.status(200).json({provider}) 
            }
        }
        catch(err){
            res.status(500).json({err: err});
        }
    }

    const deleteOne = async (req,res) => {
        const id = req.params.id;
        if(isNaN(id)){
            res.status(400).json({err: "ID invalido!"})
        }
        const adm = await app.db.select("*").table("providers").innerJoin("users", "providers.id","users.id").where("providers.id", id);
            if(adm === undefined || adm.length === 0){
                res.status(404).json({err: "Prestador não encontrado!"})
            } else {
                await app.db.transaction(async trans => {
                    await app.db.where("id", id).delete().table("providers");
                    await app.db.where("id", id).delete().table("users");
                })
                res.status(204).send() 
            }
    }

    const update = async (req, res) => {
        const id = req.params.id;
        if(id != req.user.id){
            res.status(401).json({err: "Somente o proprío usuario pode alterar os dados"})
            return;
        }
        const { birth, username, type_user, rg, street, n_house, bairro, zip_code, neighborhood, uf, complement, company, status_login, status_active, validate, bank_agency, bank_account, n_bank, name_bank,boost, name_mom } = req.body;
        let picture;
        req.file ? picture = req.file.filename : false;
        try {
            await app.db.transaction(async trans => {
                await app.db('users').update({
                    type_user,
                    birth,
                    username,
                    rg,
                    street,
                    n_house,
                    bairro,
                    zip_code,
                    neighborhood,
                    uf,
                    complement,
                    picture: picture ? `/uploads/profile_photos/${picture}` : null,
                    company,
                    status_login,
                    status_active
                }).where("id", id)
                await app.db('providers').update({validate, bank_agency, bank_account, n_bank, name_bank, boost, name_mom}).where("id",id);
            })
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    const alterPassword = async (req, res) => {
        let id = req.user.id
        obterHash(req.body.password, async hash => {
            if (req.body.password.length < 3 || req.body.password.length > 20) {
                res.status(400).json({ err: "Senha deve conter de 4 a 20 caracteres!" })
                return;
            }
            const password = hash;
            await app.db('users').update({
                password
            }).where("id", id)
        })
    }

    return { save, findAll, findOne, deleteOne, update, alterPassword};
}
