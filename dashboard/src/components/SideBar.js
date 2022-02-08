import React from 'react';
import image from '../assets/images/logo.jpg';
import {Link, Routes, Route} from 'react-router-dom';
import ContentWrapper from './ContentWrapper';
import Error404 from './Error404';
import CategoriesInDb from './CategoriesInDb';
import LastBookInDb from './LastBookInDb';
import Books from './Books';

function SideBar(){
    return(
        <React.Fragment>

            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
                
                <Link exact to='/' className='sidebar-brand d-flex align-items-center justify-content-center'>
                <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Logo Institucional"/>
                    </div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">

                        <Link exact to='/' className='nav-link'>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Bugga Store</span>
                        </Link>
                        
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Menú</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link exact to='/CategoriesInDb' className="nav-link collapsed">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Categorias</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link exact to='/LastBookInDb' className="nav-link">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Ultimo Ingreso</span> 
                    </Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link exact to='/Books' className="nav-link">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tabla de Productos</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            <Routes>
                <Route path='/' exact element={<ContentWrapper />} />
                <Route path='/CategoriesInDb' exact element={<CategoriesInDb/>} />
                <Route path='/LastBookInDb' exact element={<LastBookInDb />} />
                <Route path='/Books' exact element={<Books />} />
                <Route path='/*' element={<Error404 />} />
            </Routes> 
        </React.Fragment>
    )
}
export default SideBar;