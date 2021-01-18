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
            const { login, birth, username, cpf_cnpj, rg, street, n_house, neighborhood, zip_code, city, uf, complement, picture, company, status_login, status_active, value_boost, value_charge, revenues, bank_agency, bank_account, n_bank, name_bank } = req.body;
            if(!validator.isEmail(login)){
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
                        type_user: "administrator",
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
                        picture,
                        company,
                        status_login,
                        status_active
                    })
                    let lastID = await app.db.select("id").table("users").first().orderBy("id", "DESC");
                    await app.db('adm').insert({ id: lastID.id, value_boost,  value_charge, revenues, bank_agency, bank_account, n_bank, name_bank})
                })
                res.status(204).send()
            }
            catch (err) {
                if(err.code == 23505){
                    res.status(400).json({err: "Email já cadastrado!"})
                    return;
                }
                res.status(500).json(err);
            }
        })
    }

    const findAll = async (req,res) => {
        try{
            const adms = await app.db.select("*").table("adm").innerJoin("users", "adm.id","users.id")
            res.status(200).json(adms)
        }
        catch(err){
            res.status(500).json({err: err})
        }
    }

    const findOne = async (req,res) => {
        const id =  req.params.id;
        if(isNaN(id)){
            res.status(400).json({err: "ID invalido!"})
        }
        try{
            const adm = await app.db.select("*").table("adm").innerJoin("users", "adm.id","users.id").where("adm.id", id);
            if(adm === undefined || adm.length === 0){
                res.status(404).json({err: "Adm não encontrado!"})
            } else {
                res.status(200).json(adm) 
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
        const adm = await app.db.select("*").table("adm").innerJoin("users", "adm.id","users.id").where("adm.id", id);
            if(adm === undefined || adm.length === 0){
                res.status(404).json({err: "Adm não encontrado!"})
            } else {
                await app.db.transaction(async trans => {
                    await app.db.where("id", id).delete().table("adm");
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
        const { birth, username, rg, street, n_house, bairro, zip_code, neighborhood, uf, complement, picture, company, status_login, status_active, value_boost, value_charge, revenues, bank_agency, bank_account, n_bank, name_bank } = req.body;
        try {
            await app.db.transaction(async trans => {
                await app.db('users').update({
                    type_user: "administrator",
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
                    picture,
                    company,
                    status_login,
                    status_active
                }).where("id", id)
                await app.db('adm').update({value_boost,  value_charge, revenues, bank_agency, bank_account, n_bank, name_bank}).where("id",id);
            })
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json(err);
        }

    }

    return { save, findAll, findOne, deleteOne, update };
}
