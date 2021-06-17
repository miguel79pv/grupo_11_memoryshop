import React, { Component }  from 'react';
import SmallCard from './SmallCard';
var cards = [];


class ContentRowMovies extends Component {

    constructor(props){
        super(props)
        this.state = {
            cardProps:[]
        }
    }
    apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(e => console.log(e))
    }
    componentDidMount() {
        this.apiCall('/api/users', this.cargarNumUsers);
        this.apiCall('/api/products', this.cargarNumProducts);
    }
    cargarNumUsers = (data) => {
        //console.log(data.users.length);
        let usersInDataBase = {
                color: "warning",
                title: "Usuarios en DB",
                cuantity: data.users.length,
                icono: "fas fa-users",
        }
        cards.push(usersInDataBase);
        this.setState({
            cardProps: cards
        });
    }
    cargarNumProducts = (data) => {
        //.log(data.data.length);
        let productsInDataBase = {
            color: "primary",
            title: "Productos en DB",
            cuantity: data.data.length,
            icono: "fas fa-box-open",
        };
        //.log(data.meta.countByBrand);
        let marcasInDataBase = {
            color:   "success",
            title: "Marcas en DB",
            cuantity: data.meta.countByBrand.length,
            icono: "fas fa-copyright",
        };
        cards.push(productsInDataBase, marcasInDataBase);
        this.setState({
            cardProps: cards
        });
        cards = [];
    }

    render() {
        let contenido;
        if(this.state.cardProps.length===0){
            contenido = <div className="row">
                <div className="col-md-4 mb-4">
                    Cargando...
                </div>
            </div>
        } else {
            //console.log(this.state.cardProps);
            contenido = <div className="row">
                {
                    this.state.cardProps.map((producto,index)=>{
                        return <SmallCard  {...producto}  key= {index}/>
                    })
                }      
            </div>
        }
    return (
    
        <React.Fragment>
                {contenido}
            </React.Fragment>
    )
    }
}

export default ContentRowMovies;