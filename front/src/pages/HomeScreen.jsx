import React, { Component } from "react"
import Footer from "../components/Footer"

export default class HomeScreen extends Component {
  render() {
    return (
      <>
        <div>
          <div className="nav justify-content-end"
            style={{
              backgroundColor: "#0B0B2B",
              padding: "10px"
            }}>

            <div className="btn-group" role="group">
              <button type="button" className="btn btn-outline-light font-viga" 
              onClick={() => window.location.href="/login"}
                style={{
                  borderColor: "#EADAC5",
                  borderWidth: "2px"
                }}> Entrar</button>

              <button type="button" className="btn btn-outline-light font-viga"
              onClick={() => window.location.href="/createLogin"}
                style={{
                  borderColor: "#EADAC5",
                  borderWidth: "2px"
                }}> Criar conta</button>
            </div>
          </div>
                
          <div className="card-group text-center"
            style={{
              height: "auto",
              width: "auto",
              paddingTop: "3%",
              paddingBottom: "3%"
            }}>

            <div className="card"
              style={{
                border: "none",
                color: "#0B0B2B",
                backgroundColor: "transparent",
                height: "auto",
                width: "auto"
              }}>
              <img className="card-img-top mx-auto d-block" src="img/sev-cliente.png" alt=""
                style={{
                  width: "60%",
                  height: "auto",
                  paddingTop: "5%",
                  paddingBottom: "5%"
                }} />
              <div className="card-body">
                <p className="card-text font-viga">Encontrar prestadores de qualidade
                de maneira rápida e prática para
                solucionar os problemas no seu
              imóvel?</p>
                <h5 className="card-title font-viga">O Severino oferece tudo isso!</h5>
              </div>
            </div>

            <div className="card text-center"
              style={{
                border: "none",
                backgroundColor: "transparent"
              }}>
              <img className="card-img-top mx-auto d-block" src="img/logo.png" alt=""
                style={{
                  width: "80%",
                  height: "auto"
                }} />
            </div>

            <div className="card"
              style={{
                border: "none",
                color: "#0B0B2B",
                backgroundColor: "transparent"
              }}>
              <img className="card-img-top mx-auto d-block" src="img/sev-prestador.png" alt=""
                style={{
                  width: "60%",
                  height: "auto",
                  paddingTop: "5%",
                  paddingBottom: "5%"
                }} />
              <div className="card-body font-viga">
                <p className="card-text">Aumentar a sua carteira de clientes,
                receber pagamentos seguros e ter
                destaque pelo seu serviço realizado
              por meio da avaliação dos clientes?</p>
                <h5 className="card-title">O Severino oferece tudo isso!</h5>
              </div>
            </div>
          </div>
          <Footer />

        </div>
      </>
    )
  }
}