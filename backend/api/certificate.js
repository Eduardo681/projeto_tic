const { transformAuthInfo } = require("passport");

module.exports = app => {
    const save = async (req, res) => {
        const id_provider = req.user.id;
        const certificate = req.file.filename;
        const { description } = req.body
        try {
            await app.db.insert({
                id_provider,
                description,
                certificate: `http://localhost:2000/tmp/certificates/${certificate}`
            }).table("certificates")
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }

    const findAll = async (req, res) => {
        const id_provider = req.params.id;
        try {
            const certificates = await app.db.select("*").table("certificates").where("id_provider", id_provider)
            res.status(200).json(certificates)
        } catch (err) {
            res.status(500).json({ err })
        }
    }

    const findOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            req.status(400).json({ err: "ID invalido" })
        }
        try {
            const certificate = await app.db.select("*").table("certificates").where("id", id)
            res.status(200).json(certificate)
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }

    const deleteOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            req.status(400).json({ err: "ID invalido" })
        }
        try {
            await app.db("certificates").where("id", id).delete();
            res.status(204).send()
        } catch (err) {
            res.status(500).json({ err })
        }
    }

    return { save, findAll, findOne, deleteOne }
}