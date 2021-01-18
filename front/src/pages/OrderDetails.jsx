import axios from 'axios';
import React, { Component } from 'react';
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import { format } from 'date-fns';
import BtnPay from '../components/BtnPay';
import common from '../common.json';
export default class OrderDetails extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            diary: [],
            products: []
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let data = await this.getOs(id)
        let products = await this.getProducts(id)
        this.setState({ data, products })
        let diary = await this.getDiary()
        this.setState({ diary })
    }

    getOs = async (id) => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let os;
        try {
            os = await axios({
                url: `${common.url}/os/${id}`,
                method: 'get',
                headers: { Authorization: `Bearer ${token['token']}` }
            })
        } catch (error) {
            console.log(error)
        }
        return os.data.os[0];
    }

    getDiary = async () => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let diary;
        try {
            diary = await axios({
                url: `${common.url}/schedule/${this.state.data.id_diary}`,
                method: 'get',
                headers: { Authorization: `Bearer ${token['token']}` }
            })
        } catch (error) {
            console.log(error)
        }
        return diary.data.schedule[0];
    }

    getProducts = async (id) => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let products;
        try {
            products = await axios({
                url: `${common.url}/os/${id}/products`,
                method: 'get',
                headers: { Authorization: `Bearer ${token['token']}` }
            })
        } catch (error) {
            console.log(error)
        }
        return products.data.products;
    }

    getStatus_os(status_os) {
        let status;
        if (status_os === 'pendent') {
            status = 'Pendente'
        } else if (status_os === "awaiting_payment") {
            status = "Aguardando pagamento"
        } else if (status_os === "finished") {
            status = "Finalizada"
        } else if (status_os === 'canceled') {
            status = "Cancelada"
        }
        return status;
    }

    realizePayment(status_os) {
        if (status_os === "awaiting_payment")
            return <BtnPay />
    }

    render() {
        let id = this.props.match.params.id;
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let type_user = token['type_user']
        if (this.state.data.length === 0) {
            return <></>
        } else {
            return (
                <div style={{
                    backgroundImage: "url(http://localhost:3000/img/sev-fundo.jpg)", backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '160vh'
                }}>
                    <div style={{ backgroundColor: '#0B0B2B' }}>
                        {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
                    </div>
                    <div className="container" style={{ fontFamily: "Viga, sans-serif" }}>
                        <div className="card" style={{ margin: 15, padding: 40 }}>
                            <div className="row">
                                <h3 style={{ width: "60%", position: 'relative', float: 'left' }}>
                                    {this.getStatus_os(this.state.data.status_os)}
                                </h3>
                                <h3 style={{ float: 'right', width: "40%", position: 'relative' }}>
                                    Ordem de Serviço Nº {id}
                                </h3>
                            </div>
                            <div className="row">
                                <span class="badge" style={{ backgroundColor: '#01BFAF', color: 'black' }}>{format(new Date(this.state.data.open_date), 'dd-MM-yyyy')}</span>
                            </div>
                            <hr />
                            <div className="row">
                                <h5>{this.state.data.prestador}</h5>
                            </div>
                            <div className="row">
                                <div><span style={{ fontWeight: "bold" }}>Endereço - </span>
                                    {this.state.diary.street}, nº {this.state.diary.n_house}, {this.state.diary.neighborhood}, {this.state.diary.city} / {this.state.diary.uf}
                                </div>
                            </div>
                            <div className="row">
                                <span style={{ fontWeight: "bold" }}>Contato - </span>
                                {this.state.diary.cliente}
                            </div>
                            <hr />
                            <div className="card" style={{ padding: 10 }}>
                                <h5>Problema apresentado</h5>
                                {this.state.diary.description}
                            </div>
                            <hr />
                            <div className="card" style={{ padding: 10 }}>
                                <h5>Manutenção realizada</h5>
                                {this.state.data.service_description}
                            </div>
                            <hr />
                            <div className="card" style={{ padding: 10 }}>
                                <div style={{ textAlign: "center" }}>
                                    <h5>Produtos Utilizados</h5>
                                </div>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">CodigoProduto</th>
                                            <th scope="col">Produto</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Valor unitario</th>
                                            <th scope="col">Valor total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.products.map((e) => {
                                            return <tr>
                                                <th>{e.id}</th>
                                                <td>{e.description}</td>
                                                <td>{e.amount}</td>
                                                <td>{e.value_unitary.toFixed(2)}</td>
                                                <td>{(e.value_unitary * e.amount).toFixed(2)}</td>

                                            </tr>
                                        })}
                                    </tbody>
                                </table>

                            </div>
                            <br />
                            <div style={{ fontWeight: 'bold' }}>
                                <div className="row" >
                                    <div className="col col-m4">
                                        Mão de obra: R$
                                        {this.state.data.value_manpower === null ?
                                            this.state.data.value_manpower = 0 : null,
                                            this.state.data.value_manpower.toFixed(2)} <br />
                                        Valor total OS: R${this.state.data.value_total === null ?
                                            this.state.data.value_total = 0 : null,
                                            this.state.data.value_total.toFixed(2)}

                                    </div>
                                    <div className="col col-m4">
                                        Valor material: R$
                                        {this.state.data.valor_material === null ?
                                            this.state.data.valor_material = 0 : null,
                                            this.state.data.valor_material.toFixed(2)} <br />
                                        Valor comissão (10%): R${this.state.data.value_total === null ?
                                            this.state.data.value_total = 0 : null,
                                            (this.state.data.value_total * 10 / 100).toFixed(2)}
                                    </div>
                                    <div className="col col-m4">
                                        <form action={`http://161.35.51.118/pay/os/${id}`} method="post">
                                            <input type="number" name="value" value={
                                                this.state.data.value_total === null ?
                                                    this.state.data.value_total = 0 : null,
                                                this.state.data.value_total.toFixed(2)} style={{ display: 'none' }} />
                                            <input type="text" name="email" value={this.state.data.login} style={{ display: 'none' }} />
                                            <input type="text" name="title" value={this.state.data.service_description} style={{ display: 'none' }} />
                                            {this.realizePayment(this.state.data.status_os)}
                                           
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}