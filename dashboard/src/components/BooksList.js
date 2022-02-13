import React from 'react';

function BooksList(props){
    return(
        <React.Fragment>
            <tr >
				<td>{props.id}</td>
				<td>{props.title}</td>
                <td>{props.categorias.name}</td>
                <td>{props.autores.name}</td>
                {/* <td>{props.description}</td> */}
				
			</tr>
        </React.Fragment>
    )
}
export default BooksList;