import React, {Component} from 'react';

class ProductList extends Component{
    
	constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }

	apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }

	componentDidMount(){
		this.apiCall('/api/products', this.cargarProductos)
	}

	cargarProductos = (data) => {
        //console.log(data.data);
		this.setState({products:data.data})
	}


	render(){

        
		return(
			<React.Fragment>
						{/*<!-- PRODUCTS LIST -->*/}
						
						{/*<!-- DataTales Example -->*/}
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h1 className="h3 mb-2 text-gray-800">All products in the Database</h1>
                        	</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
										<thead>
											<tr>
												<th>Id</th>
												<th>Nombre</th>
												<th>Descripción</th>
												<th>Marca</th>
												
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>Id</th>
												<th>Nombre</th>
												<th>Descripción</th>
												<th>Marca</th>
												
											</tr>
										</tfoot>
										<tbody>
										{
                    						this.state.products.map((product,index)=>{
                        						return  <tr key={index}>
															<td>{product.idproducto}</td>
															<td><a href={"/product/"+product.idproducto}>{product.nombre}</a></td>
															<td>{product.descripcion}</td>
															<td>{product.marcas.nombre}</td>
															
														</tr>
                    						})
                						}
										</tbody>
									</table>
								</div>
							</div>
						</div>            
			</React.Fragment>
		)
	}
	
}
export default ProductList;