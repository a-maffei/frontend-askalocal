import React , {useState , useEffect} from "react";
import axios from "axios"
import { useParams } from "react-router-dom";



export default function LocalInfo(){
    // const { id } = useParams()
    const {id} = useParams()
    const [local , setLocal] = useState([])
    const [review , setReview] = useState('')
    

    console.log('bamm ',id) 

    const fetchData = async () => {  
        console.log('test',id)          
        const result = await axios.get(`https://backend-askalocal.onrender.com/local/${id}`)
        setLocal(result.data.local)
        
    };

 
  

    useEffect(() => {        
        fetchData()
       
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`https://backend-askalocal.onrender.com/local/${id}/review`, {
            review
        })
        .then(res => setLocal(res.data.local))
        .catch(err => console.log(err))
        
    }


    console.log(local)

    

   // const oneLocal = local.find((local) => local._id === id)

    // console.log(oneLocal)
  
    return(
        <div>
           <h1>Local Info</h1>
           <div className="first-section">
           <img src={local.pic} style={{width: "200px"}}/>
           <div>
           <h2>{local.firstname}</h2>
           <p>{local.bio}</p>
           </div>
           </div>


           <h2>{local.firstname} Offers:</h2>

           <div className="offers">

           
           <h3>{local.emailP?.category}</h3>
           <p>{local.emailP?.textfield}</p>
           <p>{local.emailP?.price} €</p>

           </div>

           <div className="offers">

           
           <h3>{local.interviewP?.category}</h3>
           <p>{local.interviewP?.textfield}</p>
           <p>{local.interviewP?.price} €</p>

           </div>


           <div className="offers">

           
           <h3>{local.appointmentP?.category}</h3>
           <p>{local.appointmentP?.textfield}</p>
           <p>{local.appointmentP?.price} €</p>

           </div>

           <div className="contact-button">

           <button >Contact a Local</button>
           </div>

           
           



           



         



          
          
         
          


        
           
           
           </div>
    )
}
