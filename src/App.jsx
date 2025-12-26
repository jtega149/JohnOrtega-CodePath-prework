import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import { supabase } from './client'
import './App.css'

const App = () => {

  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
        const getCreators = async () => {
          try {
            const { data } = await supabase.from('creators').select();
            console.log("Fetched creators: ", data);
            setCreators(data);
          } catch (error) {
            console.error("Error fetching creators: ", error);
          }
          setLoading(false);
        }
        getCreators();
    }, [])
    
    if (loading) {
      return (
        <div className="App">
          <h1>Creatorverse</h1>
          <p>Loading creators...</p>
        </div>
      )
    }

  let element = useRoutes([
    {
      path: "/",
      element:<ShowCreators data={creators}/>
    },
    {
      path:"/edit/:id",
      element: <EditCreator data={creators} />
    },
    {
      path:"/new",
      element: <AddCreator />
    },
    {
      path: "/:id",
      element: <ViewCreator data={creators} />
    }
  ])

  
  return ( 

    <div className="App">

      <header className="App-header">
        <h1>Creatorverse</h1>
        <nav>
          <ul>
            <li><a href="/" role="button">View All Creators</a></li>
            <li><a href="/new" role="button">Add a Creator</a></li>
          </ul>
        </nav>
      </header>
      
      <main> {element} </main>

    </div>

  )
}

export default App