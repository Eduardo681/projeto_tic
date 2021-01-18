
module.exports = app => {
    const save = async (req, res) => {
        const { id_service, id_provider } = req.body;
        
        if(!req.user.type == "provider" || !req.user.type == "provider_company"){
            res.status(401).json({err: "Usúario não autorizado"});
            return;
        }
        try {
            await app.db.insert({ id_service, id_provider, rate: 0 }).table("services_provider");
            res.status(204).send();
        }
        catch (err) {
            res.status(500).json({ err: err });
        }
    }

    const findAll = async (req, res) => {
        try {
            const service_provider = await app.db.select("users.id", "users.username","services.title_service", "services.description", "rate", "users.picture").table("services_provider")
                .innerJoin("providers","providers.id", "id_provider")
                .innerJoin("users","users.id", "providers.id")
                .innerJoin("services","services.id", "id_service")

            res.status(200).json({service_provider});
        }
        catch (err) {
            res.status(500).json({ err: err });
        }
    }

    const findOne = async (req, res) => {
        const service_id = req.query.service_id;
        const provider_id = req.query.provider_id;
        let where;
        if(service_id != undefined && provider_id != undefined){
            where = `id_service = ${service_id} and id_provider = ${provider_id}`
        } else if(service_id != undefined && provider_id === undefined){
            where = `id_service = ${service_id}`
        } else if(provider_id != undefined && service_id === undefined) {
            where = `id_provider = ${provider_id}`
        } else {
            res.status(400).json({err: "Verifique os parametros"})
        }
        try {
            const service_provider = await app.db.select("users.id as id_user", "users.picture as picture", "services.id as service_id",  "users.username","services.title_service", "services.description", "rate").table("services_provider").whereRaw(where)
            .innerJoin("providers","providers.id", "id_provider")
            .innerJoin("users","users.id", "providers.id")
            .innerJoin("services","services.id", "id_service")

            if (service_provider === undefined || service_provider.length === 0) {
                res.status(404).json({ err: "Serviço ou prestador não encontrado" })
            } else {
                res.status(200).json({service_provider})
            }

        }
        catch (err) {
            res.status(500).json({ err: err , query: where})
        }
    }

/*     const update = async (req, res) => {
        const service_id = req.params.service_id;
        const provider_id = req.params.provider_id;
        const { id_service, id_provider, rate } = req.body;
        try {
            await app.db("services_provider").update({ id_service, id_provider, rate }).whereRaw(`id_service = ${service_id} and id_provider = ${provider_id}`);
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json({ err: err })
        }
    } */

    const deleteOne = async (req, res) => {
        const service_id = req.query.service_id;
        const provider_id = req.query.provider_id;
        const service = await app.db.select("*").table("services_provider").whereRaw(`id_service = ${service_id} and id_provider = ${provider_id}`)
        if (service === undefined || service.length === 0) {
            res.status(404).json({ err: "Serviço ou prestador não encontrado!" })
        } else {

            await app.db.whereRaw(`id_service = ${service_id} and id_provider = ${provider_id}`).delete().table("services_provider");
        

            res.status(204).send()
        }
    }

    return { save, findAll, findOne /*, update */, deleteOne }
}