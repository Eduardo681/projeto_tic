import React, { Component } from "react"
import Footer from "../components/Footer"

export default class Developing extends Component {
  render() {
    return (
      <>
        <div className="content">
          <img className="mx-auto d-block logo-big" src="img/logo.png" alt=""></img>

          <div id="form" className="mx-auto d-block font-viga" style={{ textAlign: "center", color: "#0B0B2B" }}>
            <h1>Em desenvolvimento</h1>
          </div>
        </div>
        <Footer/>
      </>
    )
  }
}