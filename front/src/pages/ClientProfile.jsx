import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import common from '../common.json';
import { useState } from 'react';
import { format } from 'date-fns';
import { cpfMask, Rg, mCEP } from '../mask'
import BtnEdit from '../components/BtnEdit';
import BtnEdit1 from '../components/BtnEdit1';

import BtnSuccess from '../components/BtnSuccess';
import BtnDelete from '../components/BtnDelete';
import BtnAdd from '../components/BtnAdd';

export default function ClientProfile() {
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    let type_user = token['type_user']
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(true)
    const [addreses, setAddreses] = useState([])
    const [idEdit, setIdEdit] = useState()
    const [newAddress, setNewAdd] = useState({
        zip_code: '',
        street: '',
        complement: '',
        uf: '',
        neighborhood: '',
        city: '',
        n_house: 0
    })
    useEffect(() => {
        const getUser = async () => {
            let res;
            try {
                res = await axios({
                    method: 'get',
                    url: `${common.url}/users/client/${token['id']}`,
                    headers: {
                        Authorization: `Bearer ${token['token']}`
                    }
                })
            }
            catch (err) {
                console.log(err)
            }
            return setUser(res.data.client[0]);
        }
        const getAddresses = async () => {
            let res;
            try {
                res = await axios({
                    method: 'get',
                    url: `${common.url}/users/client/${token['id']}/adresses`,
                    headers: {
                        Authorization: `Bearer ${token['token']}`
                    }
                })
            } catch (error) {
                console.log(error)
            }
            return setAddreses(res.data.adresses)
        }
        getUser()
        getAddresses()
    }, [])
    const styles = {
        profilePicture: {
            maxWidth: '12rem',
            borderRadius: 35,
            position: 'relative',
            float: 'left',
            top: '10px',
        }
    }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const setCpf = (e) => {
        setUser({ ...user, ['cpf_cnpj']: cpfMask(e.target.value) })
    }

    const setN_house = (e) => {
        setNewAdd({ ...newAddress, ['n_house']: e.target.value })
    }

    const setRG = (e) => {
        setUser({ ...user, ['rg']: Rg(e.target.value) })
    }

    const saveAddress = async (id) => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        if (id) {
            try {
                await axios({
                    method: 'put',
                    data: newAddress,
                    url: `${common.url}/users/client/adress/${id}`,
                    headers: {
                        Authorization: `Bearer ${token['token']}`
                    }
                })
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios({
                    method: 'post',
                    data: newAddress,
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
    }

    const updateAddress = async (text, id) => {
        let newAddress;
        newAddress = { ...newAddress }
        newAddress['zip_code'] = text;
        if (text.length === 8) {
            let t = await axios({
                method: 'get',
                url: `http://viacep.com.br/ws/${text}/json/`,

            })
            newAddress['street'] = t.data.logradouro;
            newAddress['complement'] = t.data.complemento;
            newAddress['uf'] = t.data.uf;
            newAddress['city'] = t.data.localidade;
            newAddress['neighborhood'] = t.data.bairro;
        }
        setNewAdd(newAddress)
    }
    const removeAddress = async (id) => {
        try {
            await axios({
                method: 'DELETE',
                url: `${common.url}/users/client/adress/${id}`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
            alert("Endereço removido")
            window.location.reload()
        } catch (err) {

        }
    }

    if (user.birth === undefined) {
        return <> </>
    } else {
        return <>
            {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
            <div className="container font-viga" style={{ padding: 15, backgroundColor: 'rgba(255,255,255,0.6)', }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Informações Pessoais</h2>
                </div>
                <div style={{ width: '5vw', position: 'relative', margin: 0, float: 'left', paddingLeft: 55 }}>
                    <label htmlFor="file">
                        <input type="file" name="file" id="file" style={{
                            display: 'none'
                        }} />
                        <img src={`${common.url}${user.picture}`} alt="profile" style={styles.profilePicture} />
                    </label>
                </div>

                <div style={{ textAlign: 'center', width: '50vw', position: 'relative', float: 'right', paddingRight: 35 }}>

                    <div style={{ position: 'relative', width: '40vw', float: 'right' }}>
                        <div className="row">
                            <input className="form-control" type="text" name="username" disabled={edit} value={user.username} onChange={handleChange} />
                        </div> <br />
                        <div className="row">
                            <input className="form-control" style={{ width: 230, margin: 15, marginLeft: 0 }} type="text" value={cpfMask(user.cpf_cnpj)} name="cpf_cnpj" onChange={e => setCpf(e)} disabled={edit} />
                            <input className="form-control" style={{ width: 230, margin: 15, marginLeft: 0 }} type="text" disabled={edit} value={Rg(user.rg)} onChange={e => setRG(e)} />
                            <input className="form-control" style={{ width: 230, margin: 15, marginLeft: 0 }} type="date" name="birth" value={format(new Date(user.birth), 'yyyy-MM-dd')} disabled={edit} onChange={handleChange} />
                        </div><br />
                        <div className="row">
                            <select name="sex" id="sex" disabled={edit} className="form-control" value={user.sex} style={{ width: 150, marginRight: 15 }} onChange={handleChange}>
                                <option value="F" >F</option>
                                <option value="M">M</option>

                            </select>

                            <select className="form-control" name="marital_status" id="marital_status" disabled={edit} value={user.marital_status} style={{ width: 300 }} onChange={handleChange} >
                                <option value="married">Casado</option>
                                <option value="single">Solteiro</option>
                                <option value="divorced">Divorciado</option>
                                <option value="widower">Viuvo</option>
                            </select><br />

                        </div>
                    {/*     <div className="row" style={{ position: 'relative', float: 'right' }}>
                            <BtnEdit1 click={() => setEdit(!edit)} width="2.5rem" />
                            <BtnSuccess />
                        </div> */}

                    </div>
                </div>
                <div style={{ clear: 'both', padding: 20 }}>
                    <hr />
                    <div>
                        <h2 style={{ left: '50%' }}>Informações de Endereços</h2>

                        <table className="table table-bordered" style={{ clear: 'both', textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <thead>
                                <tr>
                                    <th>CEP</th>
                                    <th>Rua</th>
                                    <th>Nº Casa</th>
                                    <th>Cidade</th>
                                    <th>UF</th>
                                    <th>Complemento</th>
                                    <td>Ações</td>
                                </tr>
                            </thead>

                            {addreses.map((e) => {
                                return <tr>
                                    <input type="text" value={e.id} hidden />
                                    <td>{mCEP(e.zip_code)}</td>
                                    <td>{e.street}</td>
                                    <td>{e.n_house}</td>
                                    <td>{e.neighborhood}</td>
                                    <td>{e.uf}</td>
                                    <td>{e.complement}</td>
                                    <td>
                                        <BtnEdit width='1.5rem' click={() =>{ 
                                            updateAddress(e.zip_code)
                                            setIdEdit(e.id)
                                        }} />
                                        <BtnDelete click={() => removeAddress(e.id)} width="1.5rem" />
                                    </td>
                                </tr>
                            })}


                        </table>
                        <div style={{ position: 'relative', float: 'right' }}>
                            <BtnAdd width="2.5rem" click={() => {
                                let newAddress;
                                newAddress = { ...newAddress }
                                newAddress['zip_code'] = '';
                                newAddress['street'] = '';
                                newAddress['complement'] = '';
                                newAddress['uf'] = '';
                                newAddress['city'] = '';
                                newAddress['neighborhood'] = '';
                                setNewAdd(newAddress)
                                setIdEdit(null)
                            }} />
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
                                                <input type="text" class="form-control" value={newAddress.zip_code} onChange={e => { updateAddress(e.target.value) }} placeholder="CEP" />
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Rua" value={newAddress.street} />
                                            </div>
                                        </div><br />
                                        <div className="row">
                                            <div className="col">
                                                <input className="form-control" type="number" placeholder="Número" value={newAddress.n_house} onChange={e => setN_house(e)} />
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Cidade" value={newAddress.city} />
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="UF" value={newAddress.uf} />
                                            </div>
                                        </div><br />
                                        <div className="row">
                                            <div className="col">
                                                <input className="form-control" type="text" placeholder="Bairro" value={newAddress.neighborhood} />
                                            </div>
                                        </div><br />
                                        <div className="row">
                                            <div className="col">
                                                <input className="form-control" type="text" placeholder="Complemento" />
                                            </div>
                                        </div>
                                    </form>
                                </form>
                            </div><br />
                            <div class="modal-footer">
                                <BtnSuccess click={() => saveAddress(idEdit)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    }

}