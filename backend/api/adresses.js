
module.exports = app => {
    const save = async (req, res) => {
        const { street, n_house, neighborhood, zip_code, city, uf,  complement} = req.body;
        try {
            let lastID = await app.db.select("id").table("users").first().orderBy("id", "DESC");
            await app.db.insert({ id: lastID.id, id_client: req.user.id, street, n_house, neighborhood, zip_code, city, uf,  complement, active: true }).table("adresses");
            res.status(204).send();
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ err: err });
        }
    }

    const findAll = async (req, res) => {
        let id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            const adresses = await app.db.select("*").table("adresses")
            .whereRaw(`id_client = ${id} and active = true`);
            res.status(200).json({adresses});
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ err: err });
        }
    }

    const findOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            const adress = await app.db.select("*").table("adresses").where("id", id)
            if (adress === undefined || adress.length === 0) {
                res.status(404).json({ err: "Serviço não encontrado" })
            } else {
                res.status(200).json({adress})
            }

        }
        catch (err) {
            res.status(500).json({ err: err })
        }
    }

    const update = async (req, res) => {
        const id = req.params.id;
        const { street, n_house, neighborhood, zip_code, city, uf,  complement} = req.body;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            let client = await app.db("adresses").select("*").whereRaw(`id_client = ${req.user.id} and id = ${id}`);
            if(client == undefined){
                res.status(401).jsom({err: "Somente o proprio usuario pode alterar o endereço"})
                return;
            } else {
                await app.db("adresses").update({id_client: req.user.id,street, n_house, neighborhood, zip_code, city, uf,  complement}).where("id",id)
                res.status(204).send()
            }
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }

    const deleteOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido!" })
        }
        const adresse = await app.db.select("*").table("adresses").where("id", id);
        if (adresse === undefined || adresse.length === 0) {
            res.status(404).json({ err: "Serviço não encontrado!" })
        } else {

            await app.db.where("id", id).update({active: 0}).table("adresses");

            res.status(204).send()
        }
    }

    return { save, findAll, findOne, update, deleteOne }
}