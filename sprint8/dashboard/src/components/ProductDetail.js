import React, { Component }  from 'react';
//import Product  from './Product';
var id;
class ProductDetail extends Component {
    
	constructor(props){
        id = props.match.params.id
        super(props)
        this.state = {
            product: ""
        }
    }

	apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

	componentDidMount(){
        //console.log(id);
		this.apiCall('/api/products/'+id, this.cargarProducto)
	}

	cargarProducto = (data) => {
        //console.log(data.data.length);
        //console.log(data.data[id]);
		this.setState({product:data.data})
        //console.log(this.state.product);
        //console.log(this.state.product.length);
	}

    render() {
        let contenido;

        //    let contenido = this.state.product.map((produc,index)=>{
        //           return  <Product  {...produc}  key={index} />
        //         });
           if (this.state.product === "" ) {
               contenido =  <div className="row">Cargando...</div>
           } else {
               //console.log(this.state.product);
            contenido =
           
            <div id="content-wrapper" className="d-flex flex-column">
           
            <div id="content">
            <div className="container-fluid">
            
                {this.state.product.map((produc,i) => 
                    <div className="row" key={produc+i}>
                        <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h5 className="m-0 font-weight-bold text-gray-800">{produc.nombre}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src={produc.url_img} alt="  "/>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h5 className="m-0 font-weight-bold text-gray-800">
                                        Información
                                    </h5>
                                </div>
                                <div className="col-md-12 mb-12">
                                    <div className={`card border-left-success shadow h-100 py-2`}>
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className={`text-xs font-weight-bold text-success text-uppercase mb-1`}> PRECIO</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{produc.precio}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`card border-left-primary shadow h-100 py-2`}>
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>Descripción</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{produc.descripcion}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`card border-left-success shadow h-100 py-2`}>
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className={`text-xs font-weight-bold text-success text-uppercase mb-1`}>MARCA</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{produc.marcas.nombre}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`card border-left-warning shadow h-100 py-2`}>
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className={`text-xs font-weight-bold text-warning text-uppercase mb-1`}>TIPO DE MEMORIA</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{produc.tipos.nombre}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} 
            
            </div>
            </div>
            </div>
            }
        //     this.state.product.map((produc,index)=>{
        //       return  <Product  {...produc}  key={index} />
        //     })
        //     }
        //     </div>
        //     }
        
        return(
            <>
                {contenido}
            </>
            // <div className="col-lg-6 mb-4">
                
            //     <div className="card shadow mb-4">
            //         <div className="card-header py-3">
            //             <h5 className="m-0 font-weight-bold text-gray-800">Último producto en Base de Datos</h5>
            //         </div>
            //         {contenido}
            //     </div>
            // </div>
        );
    }
}

export default ProductDetail;
