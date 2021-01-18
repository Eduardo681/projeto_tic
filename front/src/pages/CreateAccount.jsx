import React, { Component } from "react";
import Footer from "../components/Footer";
import BtnNext from "../components/BtnNext";
import { cpfMask, mCNPJ, Rg } from "../mask";
import BtnBlue from "../components/BtnBlue";
import axios from "axios";
import common from "../common.json";
export default class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      passwordConfirmation: "",
      type_user: "",
      page: 0,
      file: '',
      client: {
        login: "",
        password: "",
        type_user: "",
        birth: "",
        username: "",
        cpf_cnpj: "",
        rg: "",
        street: "",
        n_house: "",
        neighborhood: "",
        zip_code: "",
        city: "",
        uf: "",
        complement: "",
        sex: "M",
        marital_status: "single"
      },
      provider: {
        login: "",
        password: "",
        type_user: "",
        birth: "",
        username: "",
        cpf_cnpj: "",
        rg: "",
        street: "",
        n_house: "",
        neighborhood: "",
        zip_code: "",
        city: "",
        uf: "",
        complement: "",
        bank_agency: "",
        bank_account: "",
        n_bank: "",
        name_bank: "",
        name_mom: "",
        sex: "",
        marital_status: ""
      },
    };
  }
  setFile(e) {
    this.setState({ file: e.target.files[0] })
  }
  setLogin(e) {
    this.setState({
      login: e.target.value,
    });
  }

  setPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  setPasswordConfirmation(e) {
    this.setState({
      passwordConfirmation: e.target.value,
    });
  }

  setType_user(e) {
    this.setState({
      page: 0,
      type_user: e.target.value,
    });
  }

  setClient(e) {
    const client = { ...this.state.client };
    client[e.target.name] = e.target.value;
    this.setState({ client });
  }

  setProvider(e) {
    const provider = { ...this.state.provider };
    provider[e.target.name] = e.target.value;
    this.setState({ provider });
  }

  loadForm(e) {
    if (e === "client" || e === "client_company") {
      return this.clientPersonal();
    } else if (e === "service provider" || e === "provider_company")
      return this.provider();
  }

  confirmPassword() {
    if (this.state.password === this.state.passwordConfirmation)
      return (
        <span
          className="badge"
          style={{ backgroundColor: "#01BFAF", color: "#FFFFFF" }}
        >
          Senhas confirmadas!
        </span>
      );
    else if (this.state.password !== this.state.passwordConfirmation)
      return (
        <span
          className="badge"
          style={{ backgroundColor: "#F25757", color: "#FFFFFF" }}
        >
          Senhas não coincidem!
        </span>
      );
  }

  updateCpf_Cnpj() {
    var result;

    this.state.type_user === "client" || this.state.type_user === "provider" ? (result = "CPF") : (result = "CNPJ");

    return result;
  }

  updateRG_IE() {
    var result;

    this.state.type_user === "client" || this.state.type_user === "provider" ? (result = "RG") : (result = "IE");
    return result;
  }

  async componentDidMount() {
    var login = this.props.match.params.email;
    this.setState({
      login,
    });

  }
  async updateAddress(text) {
    if (this.state.type_user == "client" || this.state.type_user == "client company") {
      let client = { ...this.state.client };
      client["zip_code"] = text;
      if (text.length === 8) {
        let t = await axios({
          method: "get",
          url: `http://viacep.com.br/ws/${text}/json/`,
        });
        client["street"] = t.data.logradouro;
        client["complement"] = t.data.complemento;
        client["uf"] = t.data.uf;
        client["city"] = t.data.localidade;
        client["neighborhood"] = t.data.bairro;
      }
      this.setState({
        client
      })
    } else {
      let provider = { ...this.state.provider };
      provider["zip_code"] = text;
      if (text.length === 8) {
        let t = await axios({
          method: "get",
          url: `http://viacep.com.br/ws/${text}/json/`,
        });
        provider["street"] = t.data.logradouro;
        provider["complement"] = t.data.complemento;
        provider["uf"] = t.data.uf;
        provider["city"] = t.data.localidade;
        provider["neighborhood"] = t.data.bairro;
      }
      this.setState({
        provider
      })
    }

  }
  clientPersonal() {
    if (this.state.page === 0) {
      return (
        <>
          <div className="content" style={{ overflow: "none" }}>
            <div>
              <div className="form-group">
                <h5
                  className="font-viga text-center"
                  style={{
                    color: "#0B0B2B",
                    padding: "1%",
                  }}
                >
                  Informações pessoais
                </h5>
              </div>

              <div>
                <label htmlFor="picture"> Foto de perfil</label>
                <br />
                <button className="btn btn-secondary" style={{border: 'none', backgroundColor: '#0B0B2B' }}>
                  <label htmlFor="file">
{/*                     <img src="/buttons/bt-media.png" style={{ width: '1.5em' }} alt="btn-media" />
 */}                    <input type="file" id="file" onChange={(e) => this.setFile(e)} />
                  </label>
                </button>                <br />

                <label htmlFor="">Nome completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira o seu nome completo"
                  value={this.state.client.username}
                  name="username"
                  onChange={(e) => this.setClient(e)}
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group font-segoeui12">
                    <label htmlFor="">Data de nascimento</label>
                    <input
                      type="date"
                      className="input-group date form-control"
                      value={this.state.client.birth}
                      name="birth"
                      onChange={(e) => this.setClient(e)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group font-segoeui12">
                    <label htmlFor="">{this.updateCpf_Cnpj()}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Insira o seu CPF/CNPJ"
                      name="cpf_cnpj"
                      value={
                        this.state.type_user === "client"
                          ? cpfMask(this.state.client.cpf_cnpj)
                          : mCNPJ(this.state.client.cpf_cnpj)
                      }
                      onChange={(e) => this.setClient(e)}
                      maxLength="14"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group font-segoeui12">
                    <label htmlFor="">{this.updateRG_IE()}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Insira o seu RG/IE"
                      name="rg"
                      maxLength="12"
                      value={
                        this.state.type_user === "client"
                          ? Rg(this.state.client.rg)
                          : this.state.client.rg
                      }
                      onChange={(e) => this.setClient(e)}
                    />
                  </div>
                </div>
              </div>
              {this.state.type_user === "client" ? (
                <div className="row">
                  <div className="col">
                    <div className="form-group font-segoeui12">
                      <label htmlFor="sex">Sexo</label>
                      <select
                        name="sex"
                        id="sex"
                        value={this.state.client.sex}
                        className="form-control"
                        onChange={(e) => this.setClient(e)}
                      >
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group font-segoeui12">
                      <label htmlFor="marital_status">Estado Civil</label>
                      <select
                        name="marital_status"
                        id="marital_status"
                        onChange={(e) => this.setClient(e)}
                        className="form-control"
                      >
                        <option value="single">Solteiro</option>
                        <option value="maried">Casado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}

              <div style={{ position: "relative", float: "right" }}>
                <BtnNext
                  click={() => this.setState({ page: this.state.page + 1 })}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="content" style={{ overflow: "none" }}>
            <div>
              <div className="form-group">
                <h5
                  className="font-viga text-center"
                  style={{
                    color: "#0B0B2B",
                    padding: "1%",
                  }}
                >
                  Informações de endereço
                </h5>
              </div>

              <div>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="CEP"
                      value={this.state.client.zip_code}
                      onChange={(e) => this.updateAddress(e.target.value)}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Rua"
                      value={this.state.client.street}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      name="n_house"
                      placeholder="Número"
                      value={this.state.client.n_house}
                      onChange={(e) => this.setClient(e)}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Cidade"
                      value={this.state.client.city}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="UF"
                      value={this.state.client.uf}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Bairro"
                      value={this.state.client.neighborhood}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Complemento"
                      value={this.state.client.complement}
                      name="complement"
                      onChange={(e) => this.setClient(e)}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={() =>
                        this.setState({ page: this.state.page - 1 })
                      }
                    >
                      <img
                        src="http://localhost:3000/buttons/bt-return.png"
                        alt=""
                        style={{
                          width: "40%",
                        }}
                      ></img>
                    </button>
                    <div style={{ position: "relative", float: "right" }}>
                      <BtnBlue
                        text="Enviar"
                        width="100px"
                        click={() => this.createClient()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  provider() {
    if (this.state.page === 0) {
      return (
        <>
          <div className="content" style={{ overflow: "none" }}>
            <div>
              <div className="form-group">
                <h5
                  className="font-viga text-center"
                  style={{
                    color: "#0B0B2B",
                    padding: "1%",
                  }}
                >
                  Informações pessoais
                </h5>
              </div>

              <div className="form-group font-segoeui12">
                <label htmlFor="picture"> Foto de perfil</label>
                <br />
                <input type="file" id="upload" />
                <img id="img" />
                <br />

                <label htmlFor="">Nome completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira o seu nome completo"
                  value={this.state.provider.username}
                  name="username"
                  onChange={(e) => this.setProvider(e)}
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group font-segoeui12">
                    <label htmlFor="">Data de nascimento</label>
                    <input
                      type="date"
                      className="input-group date form-control"
                      value={this.state.provider.birth}
                      name="birth"
                      onChange={(e) => this.setProvider(e)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group font-segoeui12">
                    <label htmlFor="">{this.updateCpf_Cnpj()}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Insira o seu CPF/CNPJ"
                      name="cpf_cnpj"
                      value={
                        this.state.type_user === "service provider"
                          ? cpfMask(this.state.provider.cpf_cnpj)
                          : mCNPJ(this.state.provider.cpf_cnpj)
                      }
                      onChange={(e) => this.setProvider(e)}
                      maxLength="14"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group font-segoeui12">
                    <label htmlFor="">{this.updateRG_IE()}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Insira o seu RG/IE"
                      name="rg"
                      maxLength="12"
                      value={
                        this.state.type_user === "service provider"
                          ? Rg(this.state.provider.rg)
                          : this.state.provider.rg
                      }
                      onChange={(e) => this.setProvider(e)}
                    />
                  </div>
                </div>
              </div>
              {this.state.type_user === "service provider" ? (
                <>
                  <div className="row">
                    <div className="col">
                      <div className="form-group font-segoeui12">
                        <label htmlFor="sex">Sexo</label>
                        <select
                          name="sex"
                          id="sex"
                          value={this.state.provider.sex}
                          className="form-control"
                          onChange={(e) => this.setProvider(e)}
                        >
                          <option value="M">M</option>
                          <option value="F">F</option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group font-segoeui12">
                        <label htmlFor="marital_status">Estado Civil</label>
                        <select
                          name="marital_status"
                          id="marital_status"
                          onChange={(e) => this.setProvider(e)}
                          className="form-control"
                          value={this.state.provider.marital_status}
                        >
                          <option value="single">Solteiro</option>
                          <option value="maried">Casado</option>
                        </select>
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">Nome completo</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Insira o seu nome da mãe"
                        value={this.state.provider.name_mom}
                        name="name_mom"
                        onChange={(e) => this.setProvider(e)}
                      />
                    </div>

                  </div>
                </>
              ) : null}

              <div style={{ position: "relative", float: "right" }}>
                <BtnNext
                  click={() => this.setState({ page: this.state.page + 1 })}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.state.page === 1) {
      return (
        <>
          <div className="content" style={{ overflow: "none" }}>
            <div>
              <div className="form-group">
                <h5
                  className="font-viga text-center"
                  style={{
                    color: "#0B0B2B",
                    padding: "1%",
                  }}
                >
                  Informações de endereço
                </h5>
              </div>

              <div>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      value={this.state.provider.zip_code}
                      placeholder="CEP"
                      onChange={(e) => this.updateAddress(e.target.value)}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Rua"
                      value={this.state.provider.street}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      name="n_house"
                      placeholder="Número"
                      value={this.state.provider.n_house}
                      onChange={(e) => this.setProvider(e)}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Cidade"
                      value={this.state.provider.city}
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="UF"
                      value={this.state.provider.uf}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Bairro"
                      value={this.state.provider.neighborhood}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Complemento"
                      value={this.state.provider.complement}
                      name="complement"
                      onChange={(e) => this.setProvider(e)}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={() =>
                        this.setState({ page: this.state.page - 1 })
                      }
                    >
                      <img
                        src="http://localhost:3000/buttons/bt-return.png"
                        alt=""
                        style={{
                          width: "40%",
                        }}
                      ></img>
                    </button>
                    <div style={{ position: "relative", float: "right" }}>
                      <BtnNext
                        click={() => this.setState({ page: this.state.page + 1 })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.state.page === 2) {
      return <>
        <div className="content" style={{ overflow: "none" }}>
          <div>
            <div className="form-group">
              <h5
                className="font-viga text-center"
                style={{
                  color: "#0B0B2B",
                  padding: "1%",
                }}
              >
                Informações para repasse
                </h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="n_bank">Número do banco</label>
              <input type="text"
                className="form-control"
                name="n_bank"
                placeholder="Codigo do banco"
                value={this.state.provider.n_bank}
                onChange={(e) => this.setProvider(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="name_bank">Nome do banco</label>
              <input type="text"
                className="form-control"
                name="name_bank"
                placeholder="Nome do banco"
                value={this.state.provider.name_bank}
                onChange={(e) => this.setProvider(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="bank_agency">Agencia</label>
              <input type="text"
                className="form-control"
                name="n_bank"
                placeholder="Agencia bancaria"
                value={this.state.provider.bank_agency}
                onChange={(e) => this.setProvider(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="bank_account">Conta</label>
              <input type="text"
                className="form-control"
                name="bank_account"
                placeholder="Conta bancaria"
                value={this.state.provider.bank_account}
                onChange={(e) => this.setProvider(e)}
              />
            </div>

          </div>
          <div className="row" style={{ marginTop: 15 }}>
            <div className="col">
              <button
                type="button"
                className="btn btn-lg"
                onClick={() =>
                  this.setState({ page: this.state.page - 1 })
                }
              >
                <img
                  src="http://localhost:3000/buttons/bt-return.png"
                  alt=""
                  style={{
                    width: "40%",
                  }}
                ></img>
              </button>
              <div style={{ position: "relative", float: "right" }}>
                <BtnBlue
                  text="Enviar"
                  width="100px"
                  click={() => console.log(this.state.provider)}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    }
  }

  createClient = async () => {

    if (this.state.password === this.state.passwordConfirmation) {
    
      try {
        let formData = new FormData();
        formData.append('login', this.state.login)
        formData.append('password', this.state.password);
        formData.append('type_user', this.state.type_user);
        formData.append('birth', this.state.client.birth);
        formData.append('username', this.state.client.username);
        formData.append('cpf_cnpj', this.state.client.cpf_cnpj);
        formData.append('rg', this.state.client.rg);
        formData.append('street', this.state.client.street);
        formData.append('n_house', this.state.client.n_house);
        formData.append('neighborhood', this.state.client.neighborhood);
        formData.append('zip_code', this.state.client.zip_code);
        formData.append('city', this.state.client.city);
        formData.append('uf', this.state.client.uf);
        formData.append('complement', this.state.client.complement);
        formData.append('picture', this.state.file)
        this.state.type_user === 'client' ? formData.append('company', false) : formData.append('company', true)
        formData.append('status_login', true);
        formData.append('status_active', 'active');
        formData.append('sex', this.state.client.sex);
        formData.append('marital_status', this.state.client.marital_status);
        await axios({
          method: 'post',
          data: formData,
          url: `${common.url}/users/clients`,
          headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` },
        })
        alert("Cadastro concluido com sucesso")
        window.location.href = '/login'
      } catch (error) {
        console.log(error)
      }

    }
  }

  render() {
    return (
      <>
        <div className="content" style={{ fontFamily: "Viga" }}>
          <div
            className="nav"
            style={{
              backgroundColor: "#0B0B2B",
              padding: "10px",
            }}
          >
            <img style={{ width: 40 }} src="img/logonav.png" alt=""></img>
          </div>

          <div
            className="font-viga text-center"
            style={{ color: "#0B0B2B", padding: "1%" }}
          >
            <h3>Para completar o seu cadastro, preencha os seguintes campos</h3>
          </div>

          <form className="form-user container">
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <h5
                    className="font-viga text-center"
                    style={{
                      color: "#0B0B2B",
                      padding: "1%",
                    }}
                  >
                    Informações usuário
                  </h5>
                </div>

                <div className="form-group font-segoeui12">
                  <label htmlFor="">Tipo de usuário</label>
                  <select
                    className="custom-select"
                    value={this.state.type_user}
                    onChange={(e) => this.setType_user(e)}
                  >
                    <option selected>Selecione</option>
                    <option value="client">Cliente - pessoa física</option>
                    <option value="client_company">
                      Cliente - pessoa jurídica
                    </option>
                    <option value="service provider">
                      Prestador(a) - pessoa física
                    </option>
                    <option value="provider_company">
                      Prestador(a) - pessoa jurídica
                    </option>
                  </select>
                </div>

                <div className="form-group font-segoeui12">
                  <label htmlFor="login">Login</label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.login}
                    disabled
                  />
                </div>

                <div className="form-group font-segoeui12">
                  <label htmlFor="password">Insira a senha</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Insira a senha"
                    value={this.state.password}
                    onChange={(e) => this.setPassword(e)}
                  />
                </div>

                <div className="form-group font-segoeui12">
                  <label htmlFor="password">Insira a senha novamente</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Insira a senha novamente"
                    value={this.state.passwordConfirmation}
                    onChange={(e) => this.setPasswordConfirmation(e)}
                  />
                  <div className="font-segoeui12">{this.confirmPassword()}</div>
                </div>
              </div>

              <div className="col">{this.loadForm(this.state.type_user)}</div>
            </div>
          </form>
        </div>

        <Footer />
      </>
    );
  }
}
