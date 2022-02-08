import React from 'react';
import imagenFondo from '../assets/images/laravel.png';
import CategoriesInDb from './CategoriesInDb';
import LastBookInDb from './LastBookInDb';
import ContentRowBooks from './ContentRowBooks';
import {Link, Routes, Route} from 'react-router-dom';

function ContentRowTop(){
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
				
					{/*<!-- Content Row Books-->*/}
					<ContentRowBooks />
					{/*<!-- End books in Data Base -->*/}
					
	
					{/*<!-- Content Row Last book in DB -->*/}
					<div className="row">
						{/*<!-- Last book in DB -->*/}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Ultimo Ingreso en Data Base</h5>
								</div>
								<div className="card-body">
									<div className="text-center">
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagenFondo} alt="laravel"/>
									</div>
									<p>Aplicaciones robustas a gran escala con modelos de bases de datos, interfaces de usuario y pruebas automatizas.</p>
									{/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Detalle</a> */}
									<Link exact to='/LastBookInDb' className="btn btn-danger">
										<span>Detalle</span> 
                    				</Link>
									<Routes>
										<Route path='/LastBookInDb' exact element={<LastBookInDb/>} />
									</Routes> 
								</div>
							</div>
						</div>
						{/*<!-- End content row last book in Data Base -->*/}

						{/*<!-- Categorys in DB -->*/}
						<CategoriesInDb />

						{/*<!--End Categorys In Db-->*/}		
					</div>
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;