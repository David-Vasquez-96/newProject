import React, { Component } from 'react';
import ApiServices from 'service/ApiServices';
import LoadingIndicator  from 'common/LoadingIndicator';
import NotAuthorized from 'common/NotAuthorized';
import Title from 'component/Title';
import Table from 'component/Table';
import Alert from 'react-s-alert';
import {functions} from 'constant/index';
import ListElement from './ListElement';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {Icon, Button} from '@material-ui/core/';
import New from './New/index';
import NewModal from './NewModal/index';
import Footer from 'page/Home/Footer2'

class ConstanciaDeInscripcionComoDirectivo extends Component {     
    constructor(props) {
        super(props);
        this.state = {
            controller:'constanciaDeInscripcionComoDirectivo',
            loading: false,
            authorized:true,
            checkAutorization:false,
            create:false,
            update:false,
            delete:false,
            rowData: [],
            data: [],
            CONSTANCIADEINSCRIPCIONCOMODIRECTIVO_SET_DATA: props.CONSTANCIADEINSCRIPCIONCOMODIRECTIVO_SET_DATA,
            header: [
                { title: 'No.', field: 'id',cellStyle:{ width: '100px' } },
                { title: 'DPI', field: 'cui' },
                { title: 'Nombre', field: 'nombre' },
                { title: 'Fecha de solicitud', field: 'fechaSolicitud',
                    render: rowData=><p>{new Intl.DateTimeFormat('es-ES').format(new Date(rowData.fechaSolicitud))}</p>
                },
                { title: 'Fecha de resolución', field: 'fechaResolucion',
                    render: rowData=><p>{rowData.estado===3 ? new Intl.DateTimeFormat('es-ES').format(new Date(rowData.fechaResolucion)):""}</p>
                },
                { title: 'Estado', field: 'estado', //,cellStyle:{ width: '100px' },
                render: rowData=><div style={{minWidth: '200px'}}>
                    {
                        (rowData.estado===1) ? 
                            (<div><Icon style={{ color: '#1E88E5' }}>description</Icon> Solicitud creada</div>) : 
                            (rowData.estado===2) ? 
                                (<div><Icon style={{ color: '#57C48F' }}>timer</Icon> Solicitud en proceso</div>) :
                                    (<div><Icon style={{ color: '#57C48F' }}>star</Icon> Solicitud entregada</div>) 
                    }  
                    </div>
                },
                { title: 'Archivo', field: 'estado', //,cellStyle:{ width: '100px' },
                render: rowData=><div style={{minWidth: '200px'}}>
                    {
                        (rowData.estado===3) ? 
                            <Button variant="outlined" size="small"
                                    color="primary"
                                    endIcon={<Icon>get_app</Icon>}
                                    onClick={async()=>{
                                        let response =  await ApiServices[this.state.controller].openFile(rowData.ubicacionDeArchivo);
                                        if (response.error!=null) Alert.error("Intente de nuevo");
                                        else functions.downloadPDFFromStringBase64(response.data,"Constancia de inscripción como directivo.pdf"); 
                                    }}
                            >Descargar</Button>
                        :
                        ""
                    }  
                    </div>
                },
            ],
            currentUser: props.currentUser,            
        }
        this.addRegister = this.addRegister.bind(this);
        this.showList = this.showList.bind(this);   
    }
     
    async addRegister(){ this.setState({create:true}); }
    
    async showList(){
        try{
            this.setState({loading: true});
            const hasPermission = await ApiServices.userSecurity.hasPermission(this.state.controller,'list');    
            if (hasPermission.error){
                this.setState({checkAutorization: false,authorized: false,loading: false });
            }else{
                ApiServices[this.state.controller].orderCriteria.clear();
                ApiServices[this.state.controller].orderCriteria.addDesc("fechaSolicitud");
                ApiServices[this.state.controller].orderCriteria.addDesc("id");
                let response =  await ApiServices[this.state.controller].listRegisterCriteria();
                let data= [];
                if (response.error!==null)      Alert.error(response.error.message);
                else if (response.data!=="")   data= response.data;
                
                this.state.CONSTANCIADEINSCRIPCIONCOMODIRECTIVO_SET_DATA(data);
                this.setState({checkAutorization: false, authorized: true,loading: false,data: data, create: false });
            }
        }catch(exception){
            (exception.status===404) ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo");
            this.setState({ loading: false,checkAutorization: false  });
        }
    }
    async componentDidMount() { this.showList(); }
    
    render() {
        if (this.state.checkAutorization ) return <LoadingIndicator/>
        if (!this.state.authorized &&  !this.state.loading){ return <NotAuthorized/>}
        {/* if (this.state.create){ return <New     showList={this.showList} elements={this.state.elements} controller={this.state.controller}/> }
        */}
         
        return (
            <div>
                {this.state.loading ? <LoadingIndicator/> : '' }

                <NewModal   open={this.state.create}   
                            handleClose={this.showList} 
                            controller={this.state.controller}/>

                <Title title="Constancia de inscripción como directivo, mandatario o representante Legal"/>
                <br/>
                {!functions.isMobile() ? (
                    <Table  pageSize={this.state.pageSize} 
                            title={"Listado de solicitudes"}
                            header = {this.state.header} 
                            data={this.state.data} 
                            refreshList={this.showList}
                            detailPanel={this.state.detailPanel}
                            addRegister={this.addRegister} 
                    />
                ) : (<ListElement/>) }
                <br/><br/><br/><Footer />                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstanciaDeInscripcionComoDirectivo);