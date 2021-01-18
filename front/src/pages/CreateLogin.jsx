import React, { Component } from "react"
import Footer from "../components/Footer"
import BtnBack from '../components/BtnBack'
export default class CreateLogin extends Component {
    constructor() {
        super()
        this.state = {
            login: "",
            acceptTerms: false
        }
    }

    setLogin(e) {
        this.setState({
            login: e.target.value
        })

        localStorage.setItem('login', this.state.login);
    }
    setAcceptTerms(){
        this.setState({
            acceptTerms: !this.state.acceptTerms
        })
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

                        <div className="form-group form-check" style={{
                            textAlign: "center",
                            marginTop: -15
                        }}>
                            <input type="checkbox" className="form-check-input" style={{
                                blockSize: "70%"
                            }}
                            value={this.state.acceptTerms}
                            onChange={() => this.setAcceptTerms()}
                             />
                            <label className="form-check-label font-segoeui8" htmlFor="login_connected"
                                style={{
                                    color: "#808080",
                                }}>Aceitar os 
                                <a href="/developing" style={{ textDecoration: "underline" }}>Termos e Condições</a>
                                </label>
                        </div>

                        <div className="form-group" id="bt_continue">
                            <button type="button"
                                className="btn mx-auto d-block"
                                id="button-blue-center"
                                style={{margin:"5%"}}
                                onClick={() => window.location.href = `/createAccount/${this.state.login}`}
                                disabled={!this.state.acceptTerms}
                            > Continuar </button>
                            <div className="font-viga text-center" style={this.state.acceptTerms ? {}: {display: "none"}}>OU</div>
                        </div>
                        <div className='g-signin2' style={this.state.acceptTerms ? {}: {display: "none"}}data-onsuccess="onSignIn" data-width="310" data-height="50" data-longtitle="true"></div>
                        <BtnBack click={() => window.location.href="/" } />
                    </form>
                </div>
                <Footer />
            </>
        )
    }
}