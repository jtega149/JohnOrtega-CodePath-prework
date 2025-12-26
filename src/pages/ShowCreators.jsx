import React, {useState, useEffect} from 'react'
import { supabase } from '../client.js'
import Card from '../components/Card.jsx'
import './ShowCreators.css'

const ShowCreators = (props) => {

  const [creators, setCreators] = useState([])

  useEffect(() => {
    setCreators(props.data);
    console.log("Creators data:", props.data);
  }, [])
  
  return (
    <>
      <div className="main-page">
        Hallo
        <div className="card-container">
          {creators.map((creator) => (
            <Card key={creator.id} person={creator} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ShowCreators