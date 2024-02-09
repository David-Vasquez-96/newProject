import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

class NotPermissions extends Component {
    render() {
        return (
            <div className="page-not-found">
                <div className="desc">
                    Opción valida solo para Partidos Políticos
                </div>
                <Link to="/"><button className="go-back-btn btn btn-primary" type="button">Ir al inicio</button></Link>
            </div>
        );
    }
}

export default NotPermissions;