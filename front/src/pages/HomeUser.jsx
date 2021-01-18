import React, { Component } from 'react';
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import axios from 'axios'
import BtnBlue from '../components/BtnBlue';
import Footer from '../components/Footer';
import common from '../common.json';
export default class HomeUser extends Component {
    constructor() {
        super();
        this.state = {
            providers: [],
            favorites: [],
            idProviders: []
        }
    }

    getProviders = async () => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let providers = await axios({
            method: 'get',
            url: `${common.url}/users/providers/services`,
            headers: {
                Authorization: `Bearer ${token['token']}`
            }

        })
        return providers;
    }
    getFavorites = async () => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let favorites = await axios({
            method: 'get',
            url: `${common.url}/users/favorites`,
            headers: {
                Authorization: `Bearer ${token['token']}`
            }

        })
        return favorites.data;
    }
    async componentDidMount() {
        let providers = await this.getProviders();
        let favorites = await this.getFavorites();
        this.setState({
            providers: providers.data.service_provider,
            favorites
        })
        await this.getFavPro()
    }
    getFavPro = async () => {
        let idProviders = []
        this.state.favorites.map((j) => {
            idProviders.push(j.id_provider)
        })
        this.setState({idProviders})
    }
    removeFavorite = async (id) => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let idProviders = []
        idProviders =Object.values({...this.state.teste})
        try{
            await axios({
                method: 'delete',
                url: `${common.url}/users/favorites/${id}`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                }
            })
        } catch(err){
            console.log(err)
        }
        let index = idProviders.indexOf(id)
        idProviders.splice(index, 1)
        let favorites = await this.getFavorites();

        this.setState({favorites, idProviders})
        await this.getFavPro();

    } 
    addFavorite = async (id) => {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let idProviders = []
        idProviders =Object.values({...this.state.teste})
        try{
            await axios({
                method: 'post',
                url: `${common.url}/users/favorites/${id}`,
                headers: {
                    Authorization: `Bearer ${token['token']}`
                },
                data: {
                    id_client: token['id'],
                    id_provider: id
                }
            })
        } catch (err){
            console.log(err)
        }
        let favorites = await this.getFavorites();
        this.setState({favorites, idProviders})
        await this.getFavPro();
    }
    render() {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let type_user = token['type_user']
        const styles = {
            card: {
                marginRight: 20,
                marginBottom: 20,
                maxWidth: '18rem',
                alignItems: 'center',
                height: '28rem',
                textAlign: 'center'
            },
            img: {
                marginTop: 10,
                borderRadius: 30,
                width: 150,
                height: 210,
                alignItems: 'center',

            }
        }
        if (this.state.providers.length === 0) {
            return <></>;
        } else {
            return <>
                {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
                <div className="container" style={{ margin: 15 }}>
                    <div className="row" style={{ width: '70vw' }}>
                        {this.state.providers.map((e, i) => {

                            return (<>
                                <div class="card" style={{ margin: 5, padding: 5 }} >
                                    <div style={{ textAlign: 'end' }}>

                                {
                                    this.state.idProviders.indexOf(e.id) === -1 ? 
                                        <button style={{border: 'none', backgroundColor: '#fff'}} type="button" onClick={() => this.addFavorite(e.id)}><i className="fa fa-star fa-lg" style={{color: '#adb5bd'}}></i></button> : 
                                        <button style={{border: 'none', backgroundColor: '#fff'}} type="button" onClick={() =>this.removeFavorite(e.id)}><i className="fa fa-star fa-lg text-warning"></i></button>
                                }
                                    </div>
                                    <div style={styles.card}>
                                        <img src={`${common.url}${e.picture}`} class="card-img-top" alt='profile_photo' style={styles.img} />
                                        <div class="card-body">
                                            <input type="hidden" value={e.id}></input>
                                            <h5 class="card-title">{e.username}</h5>
                                            <p class="card-text">{e.title_service}</p>
                                            <p class="card-text">{e.description}</p>
                                            <div style={{ textAlign: 'center', position: 'absolute', bottom: 10, left: 68 }}>
                                                <BtnBlue text="Entre em contato" fontSize="18px" click={() => window.location.href = `/detailsProvider/${e.id}`} />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </>
                            )
                        })}
                    </div>
                </div>
                <Footer />
            </>
        }

    }
}