import React, { Component } from "react"
import Footer from "../components/Footer"
import axios from "axios"
import BtnBack from "../components/BtnBack"
import common from '../common.json'
export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      login: "",
      password: ""
    }
  }

  setLogin(e) {
    this.setState({
      login: e.target.value
    })
  }

  setPassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  async login(){
    const data = {
      login: this.state.login,
      password: this.state.password
    }
    try{
      let r = await axios({
        method: 'post',
        url: `${common.url}/login`,
        data: data,
      });
      localStorage.setItem('token', JSON.stringify(r.data));
      window.location.href = "/homeUser"
    } catch (err){
      
    }
  }
  render() {
    return (
      <>
        <div className="content">
          <img className="mx-auto d-block logo" src="img/logo.png" alt=""></img>

          <form className="form">

            <div className="form-group font-segoeui12">
              <label htmlFor="login">E-mail</label>
              <input type="email" className="form-control" placeholder="Insira o e-mail"
                value={this.state.login} onChange={e => this.setLogin(e)} />
            </div>

            <div className="form-group font-segoeui12">
              <label htmlFor="password">Senha</label>
              <input type="password" className="form-control" placeholder="Insira a senha"
                value={this.state.password} onChange={e => this.setPassword(e)} />
            </div>

            <div className="form-group form-check" style={{
              textAlign: "center",
            }}>
              <input type="checkbox" className="form-check-input" style={{
                blockSize: "70%"
              }} />
              <label className="form-check-label font-segoeui8" htmlFor="login_connected"
                style={{
                  color: "#808080"
                }}>Mantenha-me conectado(a)</label>
            </div>

            <div className="form-group">
              <button type="button" 
                className="btn mx-auto d-block" id="button-blue-center"
                onClick={() => this.login()}
                > Entrar</button>
                
                <BtnBack click={() => window.location.href="/" } />
            </div>
          </form>
        </div>

          <Footer />
      </>
    )
  }
}