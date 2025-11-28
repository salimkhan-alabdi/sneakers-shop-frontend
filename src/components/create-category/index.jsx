import { useState } from "react"
import axios from "axios"

export default function CreateCategory() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("slug", slug)

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/products/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      console.log("Created:", res.data)
      alert("Category created!")
    } catch (err) {
      console.error(err)
      alert("Error while creating category")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Category name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type='text'
        placeholder='Slug'
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <button type='submit'>Create brand</button>
    </form>
  )
}
