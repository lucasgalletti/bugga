import React from 'react';
import SmallCard from './SmallCard';

let productInDataBase = {
    color:   "primary",
    titulo: "Books in Data Base",
    valor: 21,
    icono: "fas fa-book",
}

let amount ={
    color:   "success",
    titulo: "Total categories",
    valor: 12,
    icono: "fas fa-list",
}

let user = {
    color:   "warning",
    titulo: "Users quantity",
    valor: 9,
    icono: "fas fa-user",
}

let cardProps = [productInDataBase,amount,user];


function ContentRowTopBooks(){
    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((producto,index)=>{
                    return <SmallCard  {...producto}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowTopBooks;