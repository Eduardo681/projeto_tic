module.exports = app => {
    const save = async (req, res) => {
        const { day_of_week, start_time, final_hour } = req.body;
        let lastID = await app.db.select("id").table("working_yours").first().orderBy("id", "DESC");
        try {
            await app.db.insert({ id: lastID.id +1 ,id_provider: req.user.id, day_of_week, start_time, final_hour}).table("working_yours");
            res.status(204).send()
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ err })
        }
    } 

    const findAll = async (req, res) => {
        let id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
            try {
                const aux = await app.db.select("*").table("working_yours").where("id_provider", id)
                let time_work = aux;
                res.status(200).json({ time_work })
            }
            catch (err) {
                res.status(500).json({ err })
            }
        }
    

    const findOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            const aux = await app.db.select("*").table("working_yours").where("id", id)
            const time_work = aux;
            res.status(200).json({time_work})
        } catch (err) {
            res.status(500).json({ err })
        }
    }

    const update = async (req, res) => {
        const { day_of_week, start_time, final_hour, id } = req.body;
        try {
            await app.db("working_yours").where("id", id).update({ day_of_week, start_time, final_hour })
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json({ err })
        }

    }

    const deleteOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            await app.db("working_yours").where("id", id).delete()
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }
    return { save, findAll, findOne, update, deleteOne }
}