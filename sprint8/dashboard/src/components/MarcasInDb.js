import React, { Component } from "react";
import Brand  from './Brand';

class GenresInDb extends Component {
  constructor(props){
    super(props)
    this.state = {
        brandList: []
    }
  }
  
  apiCall(url, consecuencia){
    fetch(url)
    .then(response => response.json())
    .then(data => consecuencia(data))
    .catch(e => console.log(e))
  }
  
  componentDidMount() {
    this.apiCall('api/products', this.cargarMarcas)
  }
  
  cargarMarcas = (data) => {
    //console.log(data);
    let marcasInDataBase = data.meta.countByBrand;
    //console.log(marcasInDataBase);
      
    this.setState({
        brandList: marcasInDataBase
    });
    
}


  render() {
    
    let contenido;
        if(this.state.brandList.length === 0){
            contenido = <div className="row">Cargando...</div>
        } else {
            contenido = <div className="row">
                        {
                        this.state.brandList.map((brand,index)=>{
                          return  <Brand  {...brand}  key={index} />
                        })
                        }
            </div>
        }

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Marcas en Base de Datos
          </h5>
        </div>
        <div className="card-body">
        {contenido}
        </div>
      </div>
    </div>
  );
  }
}

export default GenresInDb;
