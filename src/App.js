import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Lista de peliculas
const tablaOscars =[
  { año:"2000", pelicula: "Belleza americana", directores: "Sam Mendes"},
  { año:"2001", pelicula: "Gladiador", directores: "Ridley Scott"},
  { año:"2002", pelicula: "Una mente brillante", directores: "Ron Howard"},
  { año:"2003", pelicula: "Chicago", directores: "Rob Marshall"},
  { año:"2004", pelicula: "El señor de los anillos: El retorno del rey", directores: "Peter Jackson"},
  { año:"2005", pelicula: "Million Dollar Baby", directores: "Clint Eastwood"},
  { año:"2006", pelicula: "Vidas cruzadas", directores: "Paul Haggis"},
  { año:"2007", pelicula: "Los infiltrados", directores: "Martin Scorsese" },
  { año:"2008", pelicula: "Sin lugar para los débiles", directores: "Ethan Coen"},
  { año:"2009", pelicula: "Slumdog millionaire - ¿Quién quiere ser millonario?", directores: "Danny Boyle"},
  { año:"2010", pelicula: "Vivir al límite", directores: "Kathryn Bigelow"},
  { año:"2011", pelicula: "El discurso del Rey", directores: "Tom Hooper"},
  { año:"2012", pelicula: "El artista", directores: "Michel Hazanavicius"},
  { año:"2013", pelicula: "Argo", directores: "Ben Affleck"},
  { año:"2014", pelicula: "12 años de esclavitud", directores: "Steve McQueen"},
  { año:"2015", pelicula: "Birdman (o la inesperada virtud de la ignorancia)", directores: "Alejandro González Iñárritu"},
  { año:"2016", pelicula: "En primera plana", directores: "Thomas McCarthy"},
  { año:"2017", pelicula: "Luz de luna", directores: "J	Barry Jenkins"},
  { año:"2018", pelicula: "La forma del agua", directores: "Guillermo del Toro"},
  { año:"2019", pelicula: "Green Book: Una amistad sin fronteras", directores: "Peter Farrelly"},
  { año:"2020", pelicula: "Parasite", directores: "Bong Joon-ho"},
];


const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

class App extends Component {
    state={
    busqueda: '',
    pelicula: [],
    columnas:[]
  }

  onChange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{

    const columnas = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true
      },
      {
        name: 'Año',
        selector: 'año',
        sortable: true
      },
      {
        name: 'Pelicula',
        selector: 'pelicula',
        sortable: true,
        grow: 3
      },
      {
        name: 'Directores',
        selector: 'directores',
        sortable: true,
        right:true
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    var search=tablaOscars.filter(item=>{
      if(item.año.toString().includes(this.state.busqueda) ||
      item.pelicula.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      item.directores.toLowerCase().includes(this.state.busqueda)
      ){
        return item;
      }
    });
    this.setState({pelicula: search});
  }

  crearIndex=()=>{
    var contador=1;
    tablaOscars.map(elemento=>{
      elemento["id"]=contador;
      contador++;
    })
  }

  componentDidMount(){
    this.crearIndex();
    this.asignarColumnas();
this.setState({pelicula: tablaOscars});
  }
  
render(){
  return (
    <div className="table-responsive">
      <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.onChange}
            />
            <button type="button" className="btnBuscar" >
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
      <DataTable 
      columns={this.state.columnas}
      data={this.state.pelicula}
      className="title" title = "Ganadores de los Premios Oscar 2000 - 2020 🎬" 
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
      fixedHeaderScrollHeight="600px"
      noDataComponent={<span>No se encontró ningún elemento</span>}
      />
    </div>
  );
}
}
export default App;
