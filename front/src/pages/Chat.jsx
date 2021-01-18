import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import common from '../common.json'
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            selected: '',
            contacts: [],
            msg: '',
            file: '',
            id_selected: 0
        }
    }
    getChats = async () => {
        let res;
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        try {
            res = await axios({
                method: 'get',
                url: `${common.url}/chat`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
        } catch (err) {
            console.log(err)
        }
        return res;
    }
    getContacts = async () => {
        let res;
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        try {
            res = await axios({
                method: 'GET',
                url: `${common.url}/chat/contacts`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
        } catch (error) {
            console.log(error)
        }
        return res;
    }
    async componentDidMount() {
        let messages;
        messages = await this.getChats();
        messages = messages.data.messages;
        let contacts;
        contacts = await this.getContacts();
        contacts = contacts.data.contacts;
        this.setState({ messages, contacts })
    }
    setMsg(e) {
        this.setState({ msg: e.target.value })
    }
    setFile(e) {
        this.setState({ file: e.target.files[0] })
    }
    submit = async () => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        try {
            let formData = new FormData();
            formData.append('midia', this.state.file)
            formData.append('message', this.state.msg)
            formData.append('id_provider', this.state.id_selected)
            formData.append('receptor', 0)
            await axios({
                method: 'post',
                url: `${common.url}/chat`,
                data: formData,
                headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}`, Authorization: `Bearer ${token['token']}` },
            })
            await this.componentDidMount()
            this.setState({ msg: '' })
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let type_user = token['type_user']
        const styles = {
            img: {
                maxWidth: '3rem',
                borderRadius: '15rem',
                marginRigth: 0
            },
            list: {
                backgroundColor: '#fff',
                maxWidth: '30rem',
                listStyle: 'none',
                position: 'relative',
                float: 'left',
                padding: 5
            }
        }
        if (this.state.messages.length === 0 || this.state.contacts.length === 0) {
            return <></>
        } else {
            return (<>
                {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
                <div className="container font-viga" style={{ padding: 5 }}>

                    <div className="card" style={{ maxWidth: '15vw', position: 'relative', float: 'left' }} >
                        <div style={{ backgroundColor: '#0B0B2B', color: '#fff', height: '12%', top: '-25px', padding: 25, textAlign: 'center', marginBottom: 5 }}>
                            <h3>Conversas</h3>
                        </div>

                        <ul style={styles.list}>
                            {this.state.contacts.map((e) => {
                                return (<>
                                    <li style={{ fontWeight: 'bold' }} onClick={() => this.setState({ selected: e.username, id_selected: e.id })}>
                                        <img className="img img-fluid" src={`${common.url}${e.picture}`} alt="provider" style={styles.img} />
                                        {e.username}
                                    </li><hr />
                                </>
                                )
                            })}
                        </ul>
                    </div>

                </div>

                <div style={{ height: '75vh', backgroundColor: '#fff', width: '52vw', float: "right", marginRight: '200px' }}>
                    <div style={{ backgroundColor: '#0B0B2B', color: '#fff', height: '12%', top: '-25px', padding: 1 }}>
                        <h3 style={{ margin: 15 }}>Chat</h3>
                        <h6 style={{ margin: 15 }}>{this.state.selected}</h6>
                    </div>

                    <div style={{ padding: 15, maxHeight: '75%', overflow: 'auto' }}>
                        {this.state.messages.map((e) => {
                            if (e.username === this.state.selected) {
                                if (e.receptor === false) {
                                    return <>
                                        <div>
                                            <div class="card mb-2" style={{ width: '50%', maxHeight: '12rem', float: 'right', position: 'relative', clear: 'both', border: 'none' }} >
                                                <div class="row no-gutters">
                                                    <div class="col-md-4">
                                                        <img className="img img-responsive" src={`${common.url}${token['picture']}`} class="card-img" alt="profile" style={{ maxWidth: '6.5rem', borderRadius: 15 }} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="card-body" style={{ marginLeft: '0' }}>
                                                            {
                                                                e.midia ?
                                                                    <img style={{ width: 100 }} src={`${common.url}${e.midia}`} alt="chat-media" />
                                                                    : null
                                                            }
                                                            <p class="card-text">{e.message}</p>
                                                            <p class="card-text"><small class="text-muted">{e.date_send}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                } else {
                                    return <>
                                        <div>
                                            <div class="card mb-2" style={{ width: '50%', maxHeight: '12rem', float: 'left', position: 'relative', clear: 'both', border: 'none' }} >
                                                <div class="row no-gutters">
                                                    <div class="col-md-4">
                                                        <img src={`${common.url}${e.picture}`} class="card-img" alt="profile" style={{ width: '6.5rem', borderRadius: 15 }} />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="card-body" style={{ marginLeft: '-45px' }}>
                                                            <p class="card-text">{e.message}</p>
                                                            <p class="card-text"><small class="text-muted">{e.date_send}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            }
                        })}
                    </div>
                    <div style={{ position: 'fixed', top: '80vh', width: '52vw', backgroundColor: '#0B0B2B', padding: 15, height: '8vh' }}>

                        <input type="text" placeholder="Digite a mensagem" className="form-control" value={this.state.msg} onChange={(e) => this.setMsg(e)} style={{ width: '25vw' }}></input>
                        <div class="btn-group" role="group" style={{ position: 'relative', float: 'right' }}>
                            <button className="btn btn-secondary" style={{ float: 'right', position: 'relative', top: '-30px', border: 'none', backgroundColor: '#0B0B2B' }} onClick={() => this.submit()}>
                                <i class="fa fa-send-o" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-secondary" style={{ float: 'right', position: 'relative', top: '-28px', border: 'none', backgroundColor: '#0B0B2B' }}>
                                <label htmlFor="audio">
                                    <img src="/buttons/bt-mic.png" style={{ width: '1.5em' }} alt="btn-mic" />
                                    <input id="audio" name="audio" type="file" accept="audio/*;capture=microphone" style={{ display: 'none' }} />
                                </label>
                            </button>
                            <button className="btn btn-secondary" style={{ float: 'right', position: 'relative', top: '-28px', border: 'none', backgroundColor: '#0B0B2B' }}>
                                <label htmlFor="file">
                                    <img src="/buttons/bt-media.png" style={{ width: '1.5em' }} alt="btn-media" />
                                    <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => this.setFile(e)} />
                                </label>
                            </button>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ float: 'right', position: 'relative', top: '-30px', border: 'none', backgroundColor: '#0B0B2B' }}>
                                <img src="/buttons/bt-os.png" style={{ width: '1.5em' }} alt="btn-os" />
                            </button>
                        </div>

                    </div>

                </div>
                <Footer />
            </>

            )
        }

    }
}