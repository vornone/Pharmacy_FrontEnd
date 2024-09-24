import useUpdateCategory from '../../hooks/useUpdateCategory'
import { useState } from 'react'
const UpdateCategory = () => {
  const [category, setCategory] = useState({
    category_id: 0,
    category_name: ''
  })
  const { data, loading, error, updateCategory } = useUpdateCategory()
  const handleChange = (e) => {
    const { name, value } = e.target
    setCategory((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleUpdate = () => {
    updateCategory({
      category_id: Number(category.category_id),
      category_name: category.category_name
    })
    console.log(data)
  }
  return (
    <div>
      <h2>Update Product Category</h2>
      <input type="text" onChange={handleChange} placeholder="Category Id" name="category_id" />
      <input type="text" onChange={handleChange} name="category_name" placeholder="Category Name" />
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update Category'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  )
}

export default UpdateCategory
