import React, {useState} from 'react'
import { supabase } from '../client'
import './AddCreator.css'

const AddCreator = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [youtube, setYoutube] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newCreator = {
      name,
      description,
      imageURL,
      urls: {
        youtube,
        twitter,
        instagram
      }
    }

    const { error } = await supabase
      .from("creators")
      .insert([newCreator])

    if (error) {
      console.error(error)
    } else {
      setName('')
      setDescription('')
      setImageURL('')
      setYoutube('')
      setTwitter('')
      setInstagram('')
    }
  }

  return (
    <div className="add-creator">
      <h1>Add New Creator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <input
          type="text"
          placeholder="Twitter URL"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instagram URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <button type="submit">Add Creator</button>
      </form>
    </div>
  )
}

export default AddCreator