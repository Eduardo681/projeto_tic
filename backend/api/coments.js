
module.exports = app => {
    const save = async (req, res) => {
        let {coment,id_provider} = req.body;
        if(id_provider == undefined || isNaN(id_provider)){
            res.status(400).json({err: "ID de cliente ou prestador invalido"});
            return;
        }
        if(coment.length < 5){
            res.status(400).json({err: "Comentario muito curto"});
            return;
        }
        if( req.user.type != "client" && req.user.type != "client_company"){
            res.status(401).json({err : "Somente clientes podem comentar"})
            return;
        }
        try{
            await app.db.insert({id_provider, id_client : req.user.id, coment, date: new Date()}).table("coments")
            res.status(204).send();
        }
        catch(err){
            res.status(500).json({err: err})
        }
    }

    const findAll = async (req, res) => {
        const id_provider = req.params.id_provider;
        if(isNaN(id_provider)){
            res.status(400).json({err: "ID invalido"})
        } 
        try{
            const coments = await app.db.raw(`
                SELECT 
                    C.id id_coment,
                    C2.username client,
                    P2.username provider,
                    C2.picture,
                    C.coment,
                    C.date
                FROM coments C
                INNER JOIN clients C1 on C.id_client = C1.id
                INNER JOIN users C2 on C.id_client = C2.id
                INNER JOIN providers P1 on P1.id = C.id_provider
                INNER JOIN users P2 on P2.id = P1.id
                WHERE C.id_provider = ${id_provider}
                ORDER BY C.date DESC
            `) 
            res.status(200).json({coments: coments.rows})
        }
        catch(err){
            console.log(err)
            res.status(404).json({err: "Não há comentarios para este prestador"})
        }
    }
    const findOne = async (req,res) => {
        const id = req.params.id;
        if(isNaN(id)){
            res.status(400).json({err: "ID invalido"})
        }
        try{
            const coment = await app.db.raw(`
                SELECT 
                    C.id id_coment,
                    C2.username client,
                    P2.username provider,
                    C.coment,
                    C.date
                FROM coments C
                INNER JOIN clients C1 on C.id_client = C1.id
                INNER JOIN users C2 on C.id_client = C2.id
                INNER JOIN providers P1 on P1.id = C.id_provider
                INNER JOIN users P2 on P2.id = P1.id
                WHERE C.id = ${id}
            `)
                
            res.status(200).json({coment: coment.rows})
        }
        catch(err){
            console.log(err)
            res.status(404).json({err})
        }
    }
    
    return { save, findAll, findOne}
}