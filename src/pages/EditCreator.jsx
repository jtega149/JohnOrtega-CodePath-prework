import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../client"
import React from "react"
import './EditCreator.css'

const EditCreator = ({ data }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [wantsDelete, setWantsDelete] = useState(false)

  // Find the creator from already-fetched data
  useEffect(() => {
    if (data && data.length > 0) {
      const found = data.find(c => String(c.id) === id)
      setCreator(found || null)
      setLoading(false)
    }
  }, [data, id])

  const handleChange = (e) => {
    setCreator({
      ...creator,
      [e.target.name]: e.target.value
    })
  }

  const handleURLSChange = (e) => {
    setCreator({
      ...creator,
      urls: {
        ...creator.urls,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("creators")
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description
      })
      .eq("id", id)

    if (error) {
      console.error(error)
    } else {
      navigate("/")
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
    } else {
      navigate("/")
    }
  }

  if (loading) return <p>Loading creator...</p>
  if (!creator) return <p>Creator not found.</p>

  return (
    <div>
      <div className="edit-creator-header">
        <h1>Edit Creator: {creator.name}</h1>
      </div>
      <div className="edit-container">
        <form onSubmit={handleSubmit} className="edit-creator-form">
          <h2>Edit Creator</h2>

          <input
            name="name"
            value={creator.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />

          <input
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            placeholder="imageURL"
          />

          <input
            name="youtube"
            value={creator.urls.youtube}
            onChange={handleURLSChange}
            placeholder="YouTube URL"
          />

          <input
            name="twitter"
            value={creator.urls.twitter}
            onChange={handleURLSChange}
            placeholder="Twitter URL"
          />
          
          <input
            name="instagram"
            value={creator.urls.instagram}
            onChange={handleURLSChange}
            placeholder="Instagram URL"
          />

          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <button type="submit">Save Changes</button>
        </form>
        <button className="delete-button" onClick={() => setWantsDelete(true)}> Delete Record</button>
      </div>
      {wantsDelete && (
      <div className="delete-confirmation">
        <div className="delete-modal">
          <h1>Delete Creator?</h1>
          <p>
            This will permanently remove <strong>{creator.name}</strong>.
            This action cannot be undone.
          </p>

          <div className="delete-actions">
            <button className="danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="cancel" onClick={() => setWantsDelete(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </div>

  )
}

export default EditCreator