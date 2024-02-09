const mapStateToProps = state => 
    ({
        data: state.signUp.data,
        posicionesDepartamentoMunicipio: state.signUp.posicionesDepartamentoMunicipio,
        ListadoDeCatalogos: state.signUp.ListadoDeCatalogos,
    });
export default mapStateToProps;
