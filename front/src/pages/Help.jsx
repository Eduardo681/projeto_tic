import React, { Component } from 'react';
import Footer from '../components/Footer';
import HeaderClient from '../components/HeaderClient';
import HeaderProvider from '../components/HeaderProvider';
import HelpBtn from '../components/HelpBtn';
export default class Help extends Component {
    constructor() {
        super()
        this.state = {
            content: []
        }
    }
    showContent(e) {
        if (e === 1) {
            let content = []
            content.push(
                <>
                    <h2 className="font-viga">Sobre o aplicativo</h2>
                    <p className="font-viga">
                        O aplicativo tem como objetivo auxiliar os usuários que necessitam de serviços de
                        manutenções residenciais, com confiabilidade, qualidade, agilidade, ética e
                        transparência na realização dos serviços, e oferecer empregabilidade aos
                        profissionais dos setores em Franca e Região.
                </p>
                </>
            )
            this.setState({
                content
            })
        } else if (e === 2) {
            let content = []
            content.push(
                <>
                    <h2 className="font-viga">Abertura de Ordem de Serviço</h2>
                    <p className="font-viga">
                        A abertura de uma ordem de serviço é ocorrida a partir do momento em que o cliente solicite ao prestador escolhido que realize o serviço. <br />
                        Após informar ao prestador que deseja que o mesmo realize o serviço, o prestador é que abrirá a ordem de serviço e irá controlar a ordem de serviço até que seja finalizada.
                    </p>
                </>
            )
            this.setState({
                content
            })
        } else if (e === 3) {
            let content = []
            content.push(
                <>
                    <h2 className="font-viga">Cadastro de endereços</h2>
                    <p className="font-viga">
                        Inicialmente no cadastro do cliente, ele irá inserir informações somente de um endereço, que será o seu endereço principal. Porém, caso ele queira realizar um serviço em outro endereço – por exemplo o cliente seja uma imobiliária, que administra vários imóveis – ela poderá cadastrar mais de um endereço para que seja realizado o agendamento e o serviço no endereço definido.
                    </p>
                </>
            )
            this.setState({
                content
            })
        } else if (e === 4) {
            let content = []
            content.push(
                <>
                    <h2 className="font-viga">Serviços solicitados</h2>
                    <p className="font-viga">
                    O cliente poderá acompanhar os serviços solicitados detalhadamente ao selecionar a opção da tela Serviços Solicitados e selecionar a ordem de serviço que deseja visualizar detalhadamente o andamento do seu serviço.
                </p>
                </>
            )
            this.setState({
                content
            })
        }
        else if (e === 5) {
            let content = []
            content.push(
                <>
                    <h2 className="font-viga">Sobre o prestador</h2>
                    <p className="font-viga">
                    A realização do teste para o perfil prestador leva em consideração o direcionamento direto na aprovação do cadastro inicial para que o prestador possa dar sequencia ao cadastro no aplicativo, já que o aplicativo irá depender das informações que o usuário fornecer e a análise dessas informações com uma aplicação terceirizada de antecedentes criminais.                </p>
                </>
            )
            this.setState({
                content
            })
        }
        else if (e === 6) {
            let content = []
            content.push(
                <>
                    <h2 className="font-viga">Pagamento</h2>
                    <p className="font-viga">
                        As formas de pagamento que o aplicativo oferecem são integradas com o Mercado Pago, possuindo as seguintes opções: cartão de crédito em até 12 vezes, cartão de débito virtual Caixa, a vista com o boleto bancário e pagamentos com PEC (em lotéricas), com saldo pré-adicionado na conta do Mercado Pago e com o PayPal.
                        Ao selecionar para realizar o pagamento, o cliente será redirecionado para a tela do Mercado Pago com as opções de pagamento.
                    </p>
                </>
            )
            this.setState({
                content
            })
        }
    }
    componentDidMount() {
        this.showContent(1);
    }
    render() {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        let type_user = token['type_user']
        return (
            <>
                {type_user === 'client' ? <HeaderClient /> : <HeaderProvider />}
                <div className="container" style={{ padding: '1%' }}>
                    <div className="sidebar" style={{ width: "20%", float: 'left' }}>
                        <div className="sidebar-header">
                            <h2 className="font-viga">Ajuda</h2>
                        </div>
                        <ul className="list-unstyled components">
                            <li>
                                <HelpBtn text="Sobre o aplicativo" fontSize='12px' click={() => this.showContent(1)} />
                            </li>
                            <li style={{ marginTop: 10 }}>
                                <HelpBtn text="Abertura de Ordem de Serviço" fontSize='12px' click={() => this.showContent(2)} />
                            </li>
                            <li style={{ marginTop: 10 }}>
                                <HelpBtn text="Cadastro de endereços" fontSize='12px' click={() => this.showContent(3)} />
                            </li>
                            <li style={{ marginTop: 10 }}>
                                <HelpBtn text="Serviços solicitados" fontSize='12px' click={() => this.showContent(4)} />
                            </li>
                            <li style={{ marginTop: 10 }}>
                                <HelpBtn text="Sobre o prestador" fontSize='12px' click={() => this.showContent(5)} />
                            </li>
                            <li style={{ marginTop: 10 }}>
                                <HelpBtn text="Pagamento" fontSize='12px' click={() => this.showContent(6)} />
                            </li>
                        </ul>
                    </div>
                    <div id="content" style={{ float: 'right', width: "70%", padding: 5 }}>
                        {this.state.content}
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}