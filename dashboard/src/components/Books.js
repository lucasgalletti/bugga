import React, {useState,useEffect} from 'react';
import BooksList from './BooksList';


function Books() {
    const [books,setListBooks] = useState([]);
    
    useEffect( () => {
        fetch('/api/products')
        .then(response => {
            return response.json()
        })
        .then(books =>{
            console.log(books.data)
            setListBooks(books.data)
        })
        .catch(error => console.log(error))
    },[])

// class Books extends Component{
//     constructor(){
//         super();
//         this.state = {
//             books : [] //estado inicial
//         }

//     }

//     componentDidMount(){
//         fetch('/api/products')
//         .then(response => {
//             return response.json()
//         })
//         .then(books =>{
//             this.setState({
//                 books: books.data
//             })
//         })
//     }

// 	render(){
    return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
				    {/*<!-- PRODUCTS LIST -->*/}
					<h1 className="h3 mb-2 mt-2 text-gray-800" style={{textAlign: 'center'}}>All the books in the Database</h1>
					
					{/*<!-- DataTales Example -->*/}
					<div className="card shadow mb-4" style={{margin: "10px auto"}}>
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-hover" id="dataTable" width="100%" cellspacing="0">
									<thead className='table-primay'>
										<tr>
                                            <th>Id</th>
                                            <th>Titulo</th>
                                            <th>Descripción</th>
                                            {/* <th>Premios</th>
                                            <th>Duración</th> */}
										</tr>
									</thead>
									{/* <tfoot>
										<tr>
                                            <th>Id</th>
                                            <th>Titulo</th>
                                            <th>Calificación</th>
                                            <th>Premios</th>
                                            <th>Duración</th>
										</tr>
									</tfoot> */}
									<tbody>
									{
                                    books.map((product, index)=>{
                                        return  <BooksList  {...product}  key={product + index} />
                                    })
                                	}

									</tbody>
								</table>
							</div>
						</div>
					</div>            
            </div>
    )
	// }
}
export default Books;