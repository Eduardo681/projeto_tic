import React from "react";
import Footer from "../components/Footer";
import BtnBack from '../components/BtnBack';
import { useState } from "react";
import Axios from "axios";
import common from '../common.json';

 
export default function AlterPassword (){

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const alter = async () => {
       
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        try{
            
            await Axios({
                method: 'put',
                url: `${common.url}/users/alterPassword`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                },
                data: {
                    password: {newPassword}
                }
            })
            alert("Senha alterada")
            localStorage.removeItem('token')
        }catch(err){
            
            console.log(err)
        } 
        window.location.href = '/'

       
    }
    return(
        <>
        <div className="content">
            <img className="mx-auto d-block logo" src="img/logo.png" alt=""></img>
            <form className="form">
                <div className="form-group font-segoeui12">
                    <label htmlFor="new">Nova senha</label>
                    <input type="password" className="form-control" placeholder="Insira a nova senha"
                        value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                
                <div className="form-group font-segoeui12">
                    <label htmlFor="new">Confirmação</label><br/>
                    { newPassword === confirmPassword ?  <span class="badge badge-success">Senhas coincidem!</span> : <span class="badge badge-warning">Verifique a senha</span>}
                   
                    <input type="password" className="form-control" placeholder="Insira a senha novamente"
                        value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group" id="bt_continue">
                    <button type="button"
                        className="btn mx-auto d-block"
                        id="button-blue-center"
                        style={{margin:"5%"}}
                        onClick={() => alter()}
                    > Alterar </button>
                </div>
                <BtnBack click={alter}/>
            </form>
        </div>
        <Footer />
    </>
    )
}
