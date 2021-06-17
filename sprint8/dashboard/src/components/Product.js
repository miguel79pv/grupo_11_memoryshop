import React from 'react';

function Product(props){
    console.log(props);
    return(
        <React.Fragment>
            <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={props.url_img} alt=" Star Wars - Mandalorian "/>
                        </div>
                        <p>{props.nombre} | {props.descripcion} </p>
                        <a className="btn btn-danger" target="_blank" rel="nofollow" href={"/product/"+props.idproducto}>Ver detalles</a>
                    </div>
        </React.Fragment>
    )
}
export default Product;