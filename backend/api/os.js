module.exports = app => {
    const save = async (req, res) => {
        try {
            const { id_diary, value_manpower, maintenance_description } = req.body;
            await app.db.insert({
                id_diary,
                status_os: "pendent",
                value_manpower,
                open_date: new Date(),
                maintenance_description,
                value_total: value_manpower
            }).table("os")
            res.status(204).send()
        } catch (err) {
            console.log(err)
            res.status(500).json({ err })
        }
    }

    const findOne = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
            return;
        }
        try {
            const aux = await app.db.raw(`
            SELECT
            os.id,
            os.status_os,
            os.open_date,
            d.description,
            p1.username as "prestador",
            c1.username as "cliente",
            d.contact,
            c1.login,
            os.value_manpower,
            SUM(pr.value_totaly) as "valor_material",
            os.value_total,
            os.id_diary,
            os.maintenance_description as "service_description"
            FROM os
            INNER JOIN diary d ON d.id = os.id_diary
            INNER JOIN adresses a ON d.id_adresse = a.id
            INNER JOIN working_yours W ON W.id = d.id_working_your
            INNER JOIN providers p ON p.id = w.id_provider
            INNER JOIN users p1 ON p1.id = p.id
            INNER JOIN clients c ON c.id = a.id_client
            INNER JOIN users c1 ON c.id = c1.id
            LEFT JOIN "products_os" pr ON pr.id_os = os.id
            WHERE os.id = ${id}
			GROUP BY os.id, os.status_os,d.description,
			p1.username, c1.username,  d.contact, os.value_manpower, c1.login
            `
            )
            let os = aux.rows
            res.status(200).json({ os })
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }

    const update = async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ err: "ID invalido" })
            return;
        }
        const { status_os, value_manpower, maintenance_description } = req.body;
        try {
            await app.db("os").update({ status_os, value_manpower, maintenance_description }).where("id", id)
        }
        catch (err) {
            res.status(500).json({ err })
        }
    }

    //busca todas os do user atual
    const findAll = async (req, res) => {
        const id = req.user.id;
        if (req.user.type != "client" && req.user.type != "client_company") {
            try {
                const aux = await app.db.raw(`
                SELECT
                os.id,
                os.status_os,
                os.open_date,
                d.description,
                p1.username as "prestador",
                c1.username as "cliente",
                d.contact,
                os.value_manpower,
                SUM(pr.value_totaly) as "valor_material",
                os.value_total,
                os.id_diary,
                os.maintenance_description as "service_description"
                FROM os
                
                INNER JOIN diary d ON d.id = os.id_diary
                INNER JOIN adresses a ON d.id_adresse = a.id
                INNER JOIN working_yours W ON W.id = d.id_working_your
                INNER JOIN providers p ON p.id = w.id_provider
                INNER JOIN users p1 ON p1.id = p.id
                INNER JOIN clients c ON c.id = a.id_client
                INNER JOIN users c1 ON c.id = c1.id
                LEFT JOIN "products_os" pr ON pr.id_os = os.id
                WHERE w.id_provider = ${id}
                GROUP BY os.id, os.status_os,d.description,
                p1.username, c1.username,  d.contact, os.value_manpower`)

                let os = aux.rows
                res.status(200).json({ os })
                return;
            } catch (err) {
                console.log(err)
                res.status(500).json({ err })
            }
        } else {
            try {
                const aux = await app.db.raw(`
                SELECT
            os.id,
            os.status_os,
            os.open_date,
            d.description,
            p1.username as "prestador",
            c1.username as "cliente",
            d.contact,
            os.value_manpower,
            SUM(pr.value_totaly) as "valor_material",
            os.value_total,
            os.id_diary,
            os.maintenance_description as "service_description"
            FROM os
            INNER JOIN diary d ON d.id = os.id_diary
            INNER JOIN adresses a ON d.id_adresse = a.id
            INNER JOIN working_yours W ON W.id = d.id_working_your
            INNER JOIN providers p ON p.id = w.id_provider
            INNER JOIN users p1 ON p1.id = p.id
            INNER JOIN clients c ON c.id = a.id_client
            INNER JOIN users c1 ON c.id = c1.id
            LEFT JOIN "products_os" pr ON pr.id_os = os.id
                WHERE a.id_client = ${id}
                GROUP BY os.id, os.status_os,d.description,
                p1.username, c1.username,  d.contact, os.value_manpower
               `
                )
                let os = aux.rows
                res.status(200).json({ os })
                return;
            } catch (err) {
                res.status(500).json({ err })
            }
        }
    }

    const addProduct = async (req, res) => {
        const { id_product, id_os, amount, value_unitary } = req.body;
        const total = amount * value_unitary;
        try {
            await app.db.insert({
                id_os,
                id_product,
                amount,
                value_unitary,
                value_totaly: total
            }).table("products_os");
            const current = await app.db.select("value_total").table("os");
            await app.db.update({
                value_total: total + current[0].value_total
            }).table("os")
            res.status(204).send();
        } catch (err) {
            console.log(err)
            res.status(500).json({ err })
        }
    }
    const removeProduct = async (req, res) => {
        const { id_product, id_os } = req.body;
        try {

            const value_totaly = await app.db.select("value_totaly").table("products_os").whereRaw(`id_product = ${id_product} and id_os = ${id_os}`);
            await app.db("products_os").whereRaw(`id_product = ${id_product} and id_os = ${id_os}`).delete();
            const current = await app.db.select("value_total").table("os");
            await app.db.update({
                value_total: current[0].value_total - value_totaly[0].value_totaly
            }).table("os")
            res.status(204).send();
        } catch (err) {
            console.log(err)
            res.status(500).json({ err })
        }
    }

    const updateProduct = async (req, res) => {
        const { id_product, id_os, amount, value_unitary } = req.body;
        const total = amount * value_unitary;
        try {
            await app.db("products_os").whereRaw(`id_product = ${id_product} and id_os = ${id_os}`).update({
                amount, value_unitary, value_totaly: total
            });
            const current = await app.db.select("value_manpower").table("os");
            const products = await app.db.raw(`
                SELECT  SUM(pr.value_totaly) as "valor_material" FROM os 
                LEFT JOIN "products_os" pr ON pr.id_os = os.id
                WHERE os.id = ${id_os}
            `
            )
            await app.db.update({
                value_total: current[0].value_manpower + products.rows[0].valor_material
            }).table("os")
            res.status(204).send();
        } catch (err) {
            console.log(err)
            res.status(500).json({ err })
        }
    }

    const getProducts = async (req, res) => {
        const id = req.params.id;
        try {
            const products = await app.db.select("os.id", "os.status_os", "products.id", "amount", "value_unitary", "value_totaly", "description").table("os")
                .leftJoin("products_os", "products_os.id_os", "os.id")
                .innerJoin("products", "products_os.id_product", "products.id")
                .where("os.id", id);

            res.status(200).json({ products })

        } catch (error) {
            console.log(error)
            res.status(500).json({ error })
        }
    }


    //nao pode deletar ordem de serviço
    return { save, findOne, update, findAll, addProduct, removeProduct, updateProduct, getProducts }
}