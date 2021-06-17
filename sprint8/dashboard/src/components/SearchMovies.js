import { useState, useEffect, useRef } from 'react';


function SearchMoviesHook() {
    const apiKey = "c1917587";
    

    const consulta = useRef();
//    const keyword = 'PELÍCULA DEMO';
	const [keyword, setKeyword] = useState('');
    
    const [products, setMovies] = useState([]);

    useEffect(()=> {
        console.log("%cSe actualizo el componente", "color: yellow");
    },[products])


    useEffect(() =>{
        return () => console.log("%cSe desmontó el componente", "color: red");
    },[])

    const buscarProductos = e => {
        e.preventDefault();
        //console.log("El valor del input es: " + consulta.current.value);
		//if (consulta.current.value.trim()!== '')
		if (consulta.current.value.trim()!== '')
		{
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                //console.log(data);
				//revisar error antes de setear
				var wordToSearch = consulta.current.value;
 				let productos = data.data.filter(function(el) {
						return el.nombre.toLowerCase().indexOf(wordToSearch.toLowerCase()) > -1;
					});
					//console.log(productos);
				setMovies(productos)
				setKeyword(consulta.current.value) 
				consulta.current.value="";
				
            })
            .catch(error => console.log(error));
        
		}
    }

    return(
        <div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={buscarProductos} method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={consulta} type="text" className="form-control" />
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Productos para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							products.length > 0 && products.map((product, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<a href={"/product/"+product.idproducto} style={{ 'text-decoration': 'none'}}>
											<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{product.nombre}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">													
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={`http://localhost:3001/images/${product.foto}`}
														alt={product.nombre} 
														style={{ width: '90%', height: '200px', objectFit: 'cover' }} 
													/>													
												</div>
												<p>{product.descripcion}</p>
											</div>
										</div>
										</a>
									</div>
								)
							})
						}
					</div>
					{ products.length === 0 && <div className="alert alert-warning text-center">No se encontraron productos</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
    )
}

export default SearchMoviesHook;

