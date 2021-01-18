import axios from 'axios';
import React from 'react'
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import { format } from 'date-fns';
import common from '../common.json';
export default class Orders extends React.Component {
    constructor(){
        super()
        this.state = {
            data: []
        }
    }
    async getOrders(){
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let r;
        try {
            r = await axios.get(`${common.url}/os`,  {headers: {Authorization: `Bearer ${token['token']}`}})  
        } catch (error) {
            console.log(error)
        }
        return r ? r.data.os : [];
    }
    async componentDidMount() {
        let data = await this.getOrders();
        this.setState({data})
    }
    render() {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let type_user = token['type_user']
        return (
            <div>
                {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
                <div className="container font-viga" style={{marginTop: 15}}>
                <table className="table table-hover table-light table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Nº OS</th>
                            <th scope="col">Data</th>
                            <th scope="col">Status</th>
                            <th scope="col">Prestador</th>
                            <th scope="col">Serviço</th>
                            <th scope="col">Valor Total</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((e) => {
                            let status;
                            if(e.status_os === 'pendent'){
                                status = 'Pendente'
                            } else if(e.status_os === "awaiting_payment"){
                                status = "Aguardando pagamento"
                            } else if(e.status_os === "finished"){
                                status = "Finalizada"
                            } else if(e.status_os ==='canceled'){
                                status = "Cancelada"
                            }
                            return <tr>
                                <td>{e.id}</td>
                                <td>{format(new Date(e.open_date), 'dd-MM-yyyy')}</td>
                                <td>{status}</td>
                                <td>{e.prestador}</td>
                                <td>{e.description}</td>
                                <td>{e.value_total.toFixed(2)}</td>
                                <td>
                                    <a href={`/details/${e.id}`} style={{color: '#FD8E30'}}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg>
                                    </a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
                </div>
                

        );
    }
}