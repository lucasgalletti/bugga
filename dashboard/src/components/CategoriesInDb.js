import React, {useState,useEffect} from 'react';
import Categories  from './Categories';


function CategoriesInDb() {
    const [categories,setListCategories] = useState([]);
    
    useEffect( () => {
        fetch('/api/categories')
        .then(response => {
            return response.json()
        })
        .then(categorias =>{
            console.log(categorias.data)
            setListCategories(categorias.data)
        })
        .catch(error => console.log(error))
    },[])



        return (
            <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4" style={{margin: "10px auto"}}>						
                    <div className="card shadow mb-4" >
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Categories en Data Base</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    categories.map((category,index)=>{
                                        return  <Categories  {...category}  key={category + index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
        )
        

}
export default CategoriesInDb;