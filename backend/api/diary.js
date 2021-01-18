module.exports = app => {
    const save = async (req, res) => {
        const {  id_working_your, id_adresse, date, hour, contact, description } = req.body;
        try {
            await app.db.insert({ id_working_your, id_adresse, date, hour, contact, description, user_notified: false }).table("diary");
            res.status(204).send()
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ err })
        }
    }

    const findAll = async (req, res) => {
        let user = req.user.type;
        if (user == "service provider" || user == "provider_company") {
            try {
                const aux = await app.db.raw(`
                SELECT
                D.id,
                D.date,
                D.hour,
                D.description,
                D.user_notified,
                P1.username as prestador,
                A.city,
                A.street,
                A.n_house,
                A.zip_code,
                A.UF,
                D.contact as cliente
                FROM diary D
                INNER JOIN working_yours W ON D.id_working_your = W.id
                INNER JOIN providers P ON W.id_provider = P.id
                INNER JOIN users P1 ON P1.id = P.id
                INNER JOIN adresses A ON A.id = D.id_adresse
                INNER JOIN clients C ON A.id_client = C.id
                WHERE W.id_provider = ${req.user.id}
                `
                )
                let schedules = aux.rows;
                res.status(200).json({ schedules })
            }
            catch (err) {
                console.log(err)
                res.status(500).json({ err })
            }
        } else {
            try {
                const aux = await app.db.raw(`
                        SELECT
                        D.id,
                        D.date,
                        D.hour,
                        D.description,
                        D.user_notified,
                        P1.username as prestador,
                        A.city,
                        A.street,
                        A.n_house,
                        A.zip_code,
                        A.neighborhood,
                        A.UF,
                        D.contact as cliente
                        FROM diary D
                        INNER JOIN working_yours W ON D.id_working_your = W.id
                        INNER JOIN providers P ON W.id_provider = P.id
                        INNER JOIN users P1 ON P1.id = P.id
                        INNER JOIN adresses A ON A.id = D.id_adresse
                        INNER JOIN clients C ON A.id_client = C.id
                        WHERE C.id = ${req.user.id}
                    `
                )
                let schedules = aux.rows;
                res.status(200).json({ schedules })
            }
            catch (err) {
                res.status(500).json({ err })
            }
        }
    }

    const findOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            const aux = await app.db.raw(`
            SELECT
            D.id,
            D.date,
            D.hour,
            D.description,
            D.user_notified,
            P1.username as prestador,
            A.city,
            A.street,
            A.n_house,
            A.zip_code,
            A.neighborhood,
            A.UF,
            D.contact as cliente
            FROM diary D
            INNER JOIN working_yours W ON W.id = D.id_working_your
            INNER JOIN providers P ON W.id_provider = P.id
            INNER JOIN users P1 ON P1.id = P.id
            INNER JOIN adresses A ON A.id = D.id_adresse
            INNER JOIN clients C ON A.id_client = C.id
            WHERE D.id = ${id}
            `
            )
            const schedule = aux.rows;
            res.status(200).json({schedule})
        } catch (err) {
            res.status(500).json({ err })
        }
    }

    const update = async (req, res) => {
        const id = req.params.id;
        const { id_adresse, date, hour, description, user_notified } = req.body;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
        }
        try {
            await app.db("diary").where("id", id).update({ id_adresse, date, hour, description, user_notified })
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
            await app.db("diary").where("id", id).delete()
            res.status(204).send()
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }
    return { save, findAll, findOne, update, deleteOne }
}