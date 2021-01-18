import React from 'react';

export default () => {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{color: '#fff', fontFamily: "Viga"}}>
            <a className="navbar-brand text-white" href="/" >
            <img style={{width: 40}} src="http://localhost:3000/img/logonav.png" alt=""></img>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-white " href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Perfil
                         </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/profile">Cliente</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/orders">Serviços solicitados</a>
                        </div>
                    </li>
                    <li className="nav-item" >
                        <a className="nav-link text-white" href="/chat">Chat</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/">Notificações</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/favorites">Favoritos</a>
                    </li>
                    
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-white" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Configurações
                         </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/alterpassword">Senha</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Desativar conta</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/help">Ajuda</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/signout">Sair</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Search" />
                    <button type="button" className="btn btn-outline-light font-viga" 
              onClick={() => ''}
                style={{
                  borderColor: "#EADAC5",
                  borderWidth: "2px"
                }}> Buscar</button>

                </form>
            </div>
        </nav>
    </>
}