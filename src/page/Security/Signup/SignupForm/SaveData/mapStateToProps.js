const mapStateToProps = state => 
    ({
        data: state.signUp.data,
        files: state.signUp.files,
        step: state.signUp.step,
        tokenRecaptcha: state.signUp.tokenRecaptcha,
        RecaptchaStatus: state.signUp.RecaptchaStatus,
        ArchivoDPIFrontalGrande: state.signUp.ArchivoDPIFrontalGrande,
        ArchivoDPITraseraGrande: state.signUp.ArchivoDPITraseraGrande,
        TipoArchivoDPIFrontalDiferente: state.signUp.TipoArchivoDPIFrontalDiferente,
        TipoArchivoDPITraseroDiferente: state.signUp.TipoArchivoDPITraseroDiferente,
        nombreTituloArchivo: state.signUp.nombreTituloArchivo,
    });
export default mapStateToProps;
