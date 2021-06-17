import React, { Component }  from 'react';
//import imagenFondo from '../assets/images/mandalorian.jpg';
import LastProduct  from './LastProduct';
//var producto;
class LastMovieInDb extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            lastProduct:[]
        }
    }

	apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

	componentDidMount(){
		this.apiCall('api/products', this.buscarUltimo)
	}

	buscarUltimo = (data) => {
        //console.log(data);
        //console.log(data.data.length);
		let idUltimo = data.data[data.data.length-1].idproducto;
		this.apiCall('api/products/'+idUltimo, this.cargarUltimo);
	}

	cargarUltimo = (data) => {
        //console.log(data.data);
		this.setState({lastProduct:data.data});
	}

    render() {

        let contenido;
        if (this.state.lastProduct.length === 0) {
            contenido =  <div className="row">
                <div className="card-body">
                    Cargando...
                </div>
            </div>
        } else {
            contenido = <div className="row">
            {
            this.state.lastProduct.map((product,index)=>{
              return  <LastProduct  {...product}  key={index} />
            })
            }
            </div>
              
        }
        
        return(
            <div className="col-lg-6 mb-4">
                
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Último producto en Base de Datos</h5>
                    </div>
                    {contenido}
                </div>
            </div>
        )
    }
}

export default LastMovieInDb;
