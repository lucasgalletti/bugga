import React from 'react';
import imagenFondo from '../assets/images/laravel.png';

function LastBookInDb(){
    return(
        <div className="col-lg-6 mb-4" style={{margin: "10px auto"}}>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last Book in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagenFondo} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>Aplicaciones robustas a gran escala con modelos de bases de datos, interfaces de usuario y pruebas automatizas.</p>
                    {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a> */}
                </div>
            </div>
        </div>
    )
}

export default LastBookInDb;
