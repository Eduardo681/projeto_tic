module.exports = app => {
    const MercadoPago = require("mercadopago");

    const save = async (req, res) => {
        const { title, value, discount, addition, email } = req.body;
        const id_os = req.params.id;
        let value_to_pay = value;
        if (discount) {
            value_to_pay = - discount
        } else if (addition) {
            value_to_pay = + addition
        }

        let id = "" + Date.now();
        let data = {
            items: [
                item = {
                    id: id,  //uuid ou data
                    title: title,
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: parseFloat(value_to_pay)
                }
            ],
            payer: {
                email: email
            },
            external_reference: id
        }
        try {
            let pay = await MercadoPago.preferences.create(data);
            await app.db.insert({
                id_adm: 1,
                id_os,
                pay_code: id,
                type_receive: "",
                parcel: 0,
                value: parseFloat(value),
                discount: discount || 0,
                addition: addition || 0,
                value_to_pay,
                due_date: null,
                date_paid: null,
                status_pay: 'pendent',
                email
            }).table("bills_to_receive")
            await app.db.insert({
                id_adm: 1,
                id_os,
                commission: value_to_pay * 10 / 100,
                transfer_date: null,
                status_pay: 'pendent',
                email: null
            }).table("bills_to_pay")
            return res.redirect(pay.body.init_point)
        } catch (error) {
            return res.send(error.message)
        }
    }
    const update = async (req, res) => {

    }

    const findOne = async (req, res) => {
        let id = req.query.id;
        
        setTimeout(() => {
            let filter = {
                "order.id": id
            }
            MercadoPago.payment.search({
                qs: filter
            }).then(async (data) => {
                let pay = data.body.results[0];
                if(pay){
                    try {
                        await app.db("bills_to_receive").update({
                            type_receive: pay.operation_type,
                            date_paid: new Date(),
                            status_pay: pay.status
                        }).where("pay_code", pay.external_reference)
                    } catch (error) {
                        console.log(error)
                    }
                    let os = await app.db.select("id_os").table("bills_to_receive").where("pay_code", pay.external_reference)
                    if(pay.status === 'approved'){
                       
                        let aux = os[0];
                        try {
                            await app.db("os").update({
                                status_os: 'finished'
                            }).where("id", aux.id_os)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                } else {
                    console.log("Pagamento não foi efetuado")
                }
            }).catch((error) => {
                console.log(error)
            })

        }, 20000)
        
        res.send("OK").status(200)
    }

    return { save, update, findOne }
}
