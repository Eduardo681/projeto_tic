module.exports = app => {
    const save = async (req, res) => {
        const {description} = req.body;
        if(req.user.type != "service provider" && req.user.type != "provider_company"){
            res.status(401).send()
        }
        try {
            await app.db.insert({
                description, status: 1
            }).table("products")
            res.status(204).send()
        } catch (err) {
            res.status(500).json({err})
        }
    }
    const update = async (req,res) => {
        const id = req.params.id;
        if(req.user.type != "adm"){
            res.status(401).json({err: "Somente administradores podem realizar esta ação"})
            return;
        }
        const {description, status} = req.body;
        try{
            await app.db("products").update({description, status}).where("id", id)
            res.status(204).send()
        }
        catch(err){
            res.status(500).json({err})
        }
    }

    const findAll = async (req,res) =>{
        try {
            let products = await app.db.select("*").table("products");
            res.status(200).json({products})
        } catch (err) {
            res.status(500).json({err})
        }
    }

    const findOne = async (req,res) => {
        const id = req.params.id;
        try{
            let product = await app.db("products").select("*").where("id",id)
            res.status(200).send(product)
        }   
        catch(err){
            res.status(500).json({err})
        }
    }

    return {save, update, findAll, findOne}
}