class ValidarCUI{
    constructor(){
        this.cui="";
        this.depto="";
        this.muni="";
        this.numero="";
        this.total = 0;
        this.modulo="";
        this.verificador="";
        this.esError=true;
        this.mensajeError="";
        this.departamentosYNumeroDemunicipios= [ 
            /* 01 - Guatemala tiene:      */ 17 /* municipios. */, 
            /* 02 - El Progreso tiene:    */  8 /* municipios. */, 
            /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */, 
            /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */, 
            /* 05 - Escuintla tiene:      */ 13 /* municipios. */, 
            /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */, 
            /* 07 - Sololá tiene:         */ 19 /* municipios. */, 
            /* 08 - Totonicapán tiene:    */  8 /* municipios. */, 
            /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */, 
            /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */, 
            /* 11 - Retalhuleu tiene:     */  9 /* municipios. */, 
            /* 12 - San Marcos tiene:     */ 30 /* municipios. */, 
            /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */, 
            /* 14 - Quiché tiene:         */ 21 /* municipios. */, 
            /* 15 - Baja Verapaz tiene:   */  8 /* municipios. */, 
            /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */, 
            /* 17 - Petén tiene:          */ 14 /* municipios. */, 
            /* 18 - Izabal tiene:         */  5 /* municipios. */, 
            /* 19 - Zacapa tiene:         */ 11 /* municipios. */, 
            /* 20 - Chiquimula tiene:     */ 11 /* municipios. */, 
            /* 21 - Jalapa tiene:         */  7 /* municipios. */, 
            /* 22 - Jutiapa tiene:        */ 17 /* municipios. */ 
        ];
        this.cuiRegExp = /^[\\d0-9]{13}$/;
    }
    //obtenemos el cuid el usuario ingresado
    setCui(cui){
        this.cui=cui;
    }

    validateUserCui(){
        if(!this.cui){
            this.esError = true;
            this.mensajeError="Campo de CUI vacío";
            return true;
        }        
        
        if(!this.cuiRegExp.test(this.cui)){
            this.esError = true;
            this.mensajeError="CUI menor de 13 dígitos, Ingrese un CUI válido, sin espacios";
            return false;
        }        

        this.cui = this.cui.replace(/\s/, '');
        this.depto = parseInt(this.cui.substring(9, 11), 10);
        this.muni = parseInt(this.cui.substring(11, 13));
        this.numero = this.cui.substring(0, 8);
        this.verificador = parseInt(this.cui.substring(8, 9));     

        //validamos el departamento del cui del usuario si es válido o no
        if(this.depto > this.departamentosYNumeroDemunicipios.length){
            this.esError=true
            this.mensajeError="CUI con código de departamento inválido"
            return false;
        }

        //validamos el municipio del cui del usuario si es válido o no
        if(this.muni > this.departamentosYNumeroDemunicipios[this.depto -1]){
            this.esError=true
            this.mensajeError="CUI con código de municipio inválido"
            return false;
        }
        
        //si el cui es válido procede con el flujo
        // Se verifica el correlativo con base 
        // en el algoritmo del complemento 11.        
        for (var i = 0; i < this.numero.length; i++){
            this.total += this.numero[i] * (i + 2);            
        }
    
        this.modulo = (this.total % 11);
    
        this.esError=false
        this.mensajeError="Cui válido"
        return this.modulo === this.verificador;
    }

    validar(){
        this.validateUserCui();
    }

    getEsError(){ return this.esError;}
    getMensajeError(){ return this.mensajeError;}
}

export default ValidarCUI;