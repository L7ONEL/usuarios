import { Component } from 'react';
import axios from 'axios';
import Registrar from './componentes/Registrar';
import InicioSesion from './componentes/InicioSesion';
import Datos from './componentes/Datos';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      contraseña: "",
      nombre: "",
      apellido: "",
      dni: "",
      token: "",
      public: "",
      private: []
    }
  }

  registrarUsuario(user, pass, nombre, apellido, dni) {
    const url = "http://10.0.4.103:3001/api/registrar"
    const data = {
      user,
      pass,
      nombres: nombre,
      apellidos: apellido,
      documento: dni
    }

    axios.post(url, data)
      .then((response) => {
        alert("Usuario registrado.");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  iniciarSesion(user, pass) {
    const url = "http://10.0.4.103:3001/api/ingresar"
    const data = {
      user,
      pass,
    }

    axios.post(url, data)
      .then((response) => {
        this.setState({token: response.data.token});
        alert("Sesión iniciada correctamente.");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mostrarDatos(token) {
    const urlPublic = "http://10.0.4.103:3001/api/public";
    axios.get(urlPublic)
      .then((response) => {
        console.log(response.data);
        this.setState({ public: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    const urlPrivate = "http://10.0.4.103:3001/api/private/lista";
    const config = {
      header: {
        authorization: token
      }
    }
    axios.get(urlPrivate, config)
      .then((response) => {
        this.setState({ private: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='Cuerpo'>
        <div className='Lista'>

            <Registrar 
              registrarUsuario = {(user, pass, nombre, apellido, dni) => this.registrarUsuario(user, pass, nombre, apellido, dni)}
            />

            <InicioSesion 
              iniciarSesion = {(user, pass) => this.iniciarSesion(user, pass)}
            />

        </div>

        <button
          className='Boton'
          onClick={() => this.mostrarDatos(this.state.token)}
        >Mostrar datos</button>

        <div className="Lista">
          <Datos>{this.state.public}</Datos>

          {this.state.private.map((cont, index) => 
            <Datos>
              {cont}
            </Datos>
          )}
        </div>
        
      </div>
    )
  }
}
