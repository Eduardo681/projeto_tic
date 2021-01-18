
module.exports = app => {
    const save = async (req, res) => {
        const { title_service, description } = req.body;
        if(!req.user.type == "service provider" || !req.user.type == "provider_company" || !req.user.type == "administrator" ){
            res.status(401).json({err: "Usúario não autorizado"});
            return;
        }
        try {
            await app.db.insert({ title_service, description }).table("services");
            res.status(204).send();
        }
        catch (err) {
            res.status(500).json({ err: err });
        }
    }

    const findAll = async (req, res) => {
        try {
            const services = await app.db.select("*").table("services");
            res.status(200).json({services});
        }
        catch (err) {
            res.status(500).json({ err: err });
        }
    }

    const findOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            const service = await app.db.select("*").table("services").where("id", id)
            if (service === undefined || service.length === 0) {
                res.status(404).json({ err: "Serviço não encontrado" })
            } else {
                res.status(200).json({service})
            }

        }
        catch (err) {
            res.status(500).json({ err: err })
        }
    }

/*     const update = async (req, res) => {
        const id = req.params.id;
        const { title_service, description } = req.body;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            await app.db("services").update({ title_service, description }).where("id", id);
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json({ err: err })
        }
    } */

/*     const deleteOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido!" })
        }
        const service = await app.db.select("*").table("services");
        if (service === undefined || service.length === 0) {
            res.status(404).json({ err: "Serviço não encontrado!" })
        } else {

            await app.db.where("id", id).delete().table("services");

            res.status(204).send()
        }
    } */

    return { save, findAll, findOne/*, update , deleteOne */ }
}