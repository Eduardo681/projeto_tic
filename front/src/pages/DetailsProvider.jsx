import axios from 'axios';
import React, { Component } from 'react';
import Footer from '../components/Footer';
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import { format } from 'date-fns';
import BtnSuccess from '../components/BtnSuccess';
import BtnChat from '../components/BtnChat';
import common from '../common.json';
export default class DetailsProvider extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            data: [],
            coments: [],
            address: [],
            selectAddress: '',
            newDiary: {
                date: '',
                hour: '',
                description: '',
                contact: ''
            },
            newAddress: {
                zip_code: '',
                street: '',
                neighborhood: '',
                city: '',
                uf: '',
                complement: '',
                n_house: ''
            },
           
        }
    }

    async updateAddress(text){
        let newAddress = {...this.state.newAddress}
        newAddress['zip_code'] = text;
        if(text.length === 8){
            let t= await axios({
                method: 'get',
                url: `http://viacep.com.br/ws/${text}/json/`,
                
            })
            newAddress['street'] = t.data.logradouro;
            newAddress['complement'] = t.data.complemento;
            newAddress['uf'] = t.data.uf;
            newAddress['city'] = t.data.localidade;
            newAddress['neighborhood'] = t.data.bairro
        }
        this.setState({
            newAddress
        })
    }
    setN_house(e){
        let newAddress = {...this.state.newAddress}
        newAddress['n_house'] = e.target.value
        this.setState({newAddress})
      
    }

    updateNewDiary(event) {
        const newDiary = { ...this.state.newDiary }
        newDiary[event.target.name] = event.target.value
        this.setState({ newDiary })
    }

    async saveAddress(){
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        console.log(this.state.newAddress)
        try {
            axios({
                method: 'post',
                data: this.state.newAddress,
                url: `${common.url}/users/client/adresses`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
      
    }
    async componentDidMount() {
        let id = this.props.match.params.id;
        let r = await this.searchProvider(id);
        r = r.data
        this.state.data.push(r)
        let coments = await this.getComents(id)
        let address = await this.getAddress();
        address = address.data.adresses
        this.setState({ id, data: this.state.data, coments, address })
    }
    async searchProvider(id) {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let res;
        try {
            res = await axios({
                method: 'get',
                url: `${common.url}/provider-service?provider_id=${id}`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
        } catch (err) {
            console.log(err)
        }
        return res;
    }

    getComents = async (id) => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let res;
        try {
            res = await axios({
                method: 'get',
                url: `${common.url}/coments/${id}`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
        } catch (err) {
            console.log(err)
        }
        return res.data.coments;
    }
    getAddress = async () => {
        let r;
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        try {
            r = axios({
                method: "get",
                url: `${common.url}/users/client/${token['id']}/adresses`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
        } catch (err) {
            console.log(err)
        }
        return r;
    }
    changeAddress(e){
        this.setState({
            selectAddress: e.target.value
        })
    }
    saveDiary = async () => {
        let r;
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        try {
            r = await axios({
                method: 'post',
                url: `${common.url}/schedules`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                },
                data: {
                    id_working_your: 1,
                    id_adresse: this.state.selectAddress,
                    date: this.state.newDiary.date,
                    hour: this.state.newDiary.hour,
                    description: this.state.newDiary.description,
                    contact: this.state.newDiary.contact
                }
            })
            alert("Agendado!")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        return r;
    }
    provider = () => {
        let e = this.state.data[0].service_provider[0];
        let stars = []
        for (let i = 0; i < e.rate; i++) {
            stars.push(
                <i className="text-warning fa fa-star"></i>
            )
        }
        let coments = []
        for (let i = 0; i < this.state.coments.length; i++) {
            coments.push(
                <div class="card" style={{ color: 'black', marginBottom: 5, backgroundColor: '#E9E9E9' }}>
                    <img class="card-img" src={`${common.url}${this.state.coments[i].picture}`} alt="Card Profile" style={{ maxWidth: '3rem' }} />
                    <div class="card-img-overlay" style={{ left: 50, top: -20 }} >
                        <p style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 0 }}>{this.state.coments[i].client}</p>
                        <p style={{ fontSize: 16, top: -20 }}>{this.state.coments[i].coment} <span className="badge badge-secondary" style={{ float: 'right' }}>{format(new Date(this.state.coments[i].date), 'yyyy-MM-dd')}</span></p>
                    </div>
                </div>
            )
        }
        const styles = {
            btn: {
                fontFamily: "Viga, sans-serif",
                backgroundColor: '#0B0B2B',
                borderColor: '#069CC6',
                color: '#069CC6',
                boxSizing: 'content-box',
                borderWidth: '4px',
                borderRadius: '13px',
                width: '90%',
                padding: '.4rem',
                fontSize: '22px'

            },
            btn1: {
                fontFamily: "Viga, sans-serif",
                backgroundColor: '#0B0B2B',
                borderColor: '#069CC6',
                color: '#069CC6',
                boxSizing: 'content-box',
                borderWidth: '4px',
                borderRadius: '13px',
                fontSize: '14px'
            }
        }
       
        return <>
            <div class="card" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 15, minHeight: '40vh' }}>
                <img class="card-img" src={`${common.url}${e.picture}`} alt="Card Provider" style={{ maxWidth: '18.7rem', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} />

                <div class="card-img-overlay" style={{ left: 350, }}>
                    <h3>{e.username} <BtnChat /> <span style={{ float: 'right' }}>
                        <button style={styles.btn} data-toggle="modal" data-target="#exampleModal">Agendar</button>
                    </span></h3>
                    <p class="card-text">{e.title_service}</p>
                    <p class="card-text">{e.description}</p>

                    <hr />
                    <h3>Avaliações</h3>
                    <p>Média: {stars}</p>
                    <div style={{ overflow: 'auto', maxHeight: '150px' }}>
                        {coments}
                    </div>
                    <div class="modal fade" style={{ color: 'black' }} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel" >Agendamento</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <form>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="date" value={this.state.newDiary.date} name="date" class="form-control"  onChange={e => this.updateNewDiary(e)}/>
                                                </div>
                                                <div class="col">
                                                    <input type="time" value={this.state.newDiary.hour} name="hour" class="form-control" onChange={e => this.updateNewDiary(e)} />
                                                </div>
                                            </div><br />
                                            <div className="row">
                                                <div className="col">
                                                    <input className="form-control" value={this.state.newDiary.contact} name="contact" type="text" placeholder="Contato" onChange={e => this.updateNewDiary(e)}/>
                                                </div>
                                            </div><br />
                                            <div className="row">
                                                <div className="col">
                                                    <input className="form-control" value={this.state.newDiary.description} name="description" type="text" placeholder="Descrição da atividade" onChange={e => this.updateNewDiary(e)}/>
                                                </div>
                                            </div><br />
                                            <div className="row">
                                                <div className="col">
                                                    <select name="address" onChange={e => this.changeAddress(e)} id="" className="form-control">
                                                        {this.address()}
                                                    </select>
                                                    <a href="#" data-toggle="modal" data-target="#modalAd" style={{ color: 'black', textDecoration: 'underline' }}>Cadastrar novo endereço</a>
                                                </div>

                                            </div>
                                        </form>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <BtnSuccess click={() => this.saveDiary()} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal fade" style={{ color: 'black' }} id="modalAd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel" >Endereço</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <form>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="CEP" value={this.state.newAddress.zip_code} onChange={(e) => this.updateAddress(e.target.value)} />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="Rua"  value={this.state.newAddress.street} />
                                                </div>
                                            </div><br />
                                            <div className="row">
                                                <div className="col">
                                                    <input className="form-control" type="text" placeholder="Número" onChange={e => this.setN_house(e) } value={this.state.newAddress.n_house}/>
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="Cidade" value={this.state.newAddress.city} />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="UF" value={this.state.newAddress.uf} />
                                                </div>
                                            </div><br />
                                            <div className="row">
                                                <div className="col">
                                                    <input className="form-control" type="text" placeholder="Bairro"  value={this.state.newAddress.neighborhood} />
                                                </div>
                                            </div><br/>
                                            <div className="row">
                                                <div className="col">
                                                    <input className="form-control" type="text" placeholder="Complemento" />
                                                </div>
                                            </div>
                                        </form>
                                    </form>
                                </div><br/>
                                <div class="modal-footer">
                                    <BtnSuccess click={() => this.saveAddress()} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    }
    address = () => {
        let adr = [];
        for (let i = 0; i < this.state.address.length; i++) {
            adr.push(<option value={this.state.address[i].id}>{this.state.address[i].street}</option>)
        }
        return adr;
    }
    render() {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let type_user = token['type_user']
        if (this.state.data.length === 0) {
            return <> </>
        } else {
            return (
                <div style={{
                    backgroundImage: "url(http://localhost:3000/img/sev-fundo.jpg)", backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh'
                }}>
                    <div style={{ backgroundColor: '#0B0B2B' }}>
                        {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
                    </div>
                    <div className="container" style={{ padding: 10 }}>
                        {this.provider()}
                    </div>
                    <Footer />
                </div>
            )
        }

    }
}

