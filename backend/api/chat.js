module.exports = app => {
    const save = async (req,res) =>{
        const type = req.user.type;
        let {id_provider, id_client, message, receptor} = req.body;
        if(type == "client" || type === "client_company"){
            id_client = req.user.id;
        } else {
            id_provider = req.user.id;
        }
        let midia = req.file;
        try {
            await app.db.insert({
                id_provider,
                id_client,
                message,
                message_received: false,
                date_send: new Date(),
                date_received: null,
                midia: midia ? `/uploads/chats/${midia.filename}`:null,
                receptor 
            }).table("chat");
            res.status(204).send()
        } catch (err) {
            console.log(err)
            res.status(500).json({err})
        }
    }
    /*Busca todas as cvs do user logado*/
    const findAll = async (req,res) => {
        const type = req.user.type;
        if(type == "client" || type == "client_company"){
            let id_client = req.user.id;
            try {
                let messages = await app.db.select("chat.id","users.username", "users.picture", "message", "message_received", "date_received", "date_send", "midia", "receptor")
                .table("chat")
                .innerJoin("providers", "chat.id_provider", "providers.id")
                .innerJoin("users", "users.id", "providers.id")
                .where("id_client", id_client)
                .orderBy("id", "asc")
                res.status(200).json({messages});
            } catch (err){
                res.status(500).json({err})
            }
        } else {
            let id_provider = req.user.id;
            try {
                let messages = await app.db.select("chat.id","users.username","users.picture", "message", "message_received", "date_received", "date_send", "midia", "receptor")
                .table("chat")
                .innerJoin("clients", "chat.id_client", "clients.id")
                .innerJoin("users", "users.id", "clients.id")
                .where("id_provider", id_provider)
                .orderBy("chat.id", "asc")
                res.status(200).json({messages});
            } catch (err){
                res.status(500).json({err})
            }
        }
    }
/* 
    const findOne = async (req,res) => {
        const type = req.user.type;
        if(type == "client" || "client_company"){
            let id_client = req.user.id;
            let id_provider = req.params.id;
            try {
                let messages = await app.db.select("users.username", "message", "message_received", "date_received", "date_send", "midia")
                .table("chat")
                .innerJoin("providers", "chat.id_provider", "providers.id")
                .innerJoin("users", "users.id", "providers.id")
                .whereRaw(`chat.id_client = ${id_client} and chat.id_provider = ${id_provider}`)
                res.status(200).json(messages);
            } catch (err){
                res.status(500).json({err})
            }
        } else {
            let id_provider = req.user.id;
            let id_client = req.params.id;
            try {
                let messages = await app.db.select("users.username", "message", "message_received", "date_received", "date_send", "midia")
                .table("chat")
                .innerJoin("clients", "chat.id_client", "clients.id")
                .innerJoin("users", "users.id", "clients.id")
                .whereRaw(`id_client = ${id_client} and id_provider = ${id_provider}`)
                res.status(200).json(messages);
            } catch (err){
                res.status(500).json({err})
            }
        }
    } */

    //nao pode exluir, confirmar com a Le, tbm não vi sentido em implementar o findOne
    
    //faltou implementar update de date e recebimento
    const update = async (req,res) => {
        let id = req.params.id;
        if(isNaN(id)){
            res.status(400).json({err: "ID invalido"})
        }
        let {date_received, message_received}  = req.body;
        try{
            await app.db("chat").update({date_received , message_received}).where("id", id)
            res.status(204).json();
        }
        catch(err){
            res.status(500).json({err});
        }
    }

    const findContacts = async (req,res) => {
        const type = req.user.type;

        if(type == "client" || type=="client_company"){
            let id_client = req.user.id;
            try {
                let contacts = await app.db.select("users.id", "users.username", "users.picture")
                .table("chat")
                .distinct()
                .innerJoin("providers", "chat.id_provider", "providers.id")
                .innerJoin("users", "users.id", "providers.id")
                .where("id_client", id_client)
                res.status(200).json({contacts});
            } catch (err){
                res.status(500).json({err})
            }
        } else {
            let id_provider = req.user.id;
            try {
                let contacts = await app.db.select("users.id", "users.username", "users.picture")
                .table("chat")
                .distinct()
                .innerJoin("clients", "chat.id_client", "clients.id")
                .innerJoin("users", "users.id", "clients.id")
                .where("id_provider", id_provider)
                res.status(200).json({contacts});
            } catch (err){
                res.status(500).json({err})
            }
        }
    }

    return {save, findAll, update, findContacts}
}