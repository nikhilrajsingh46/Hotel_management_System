"use client"

import { useState } from "react"
import axios from "axios"

const PropertiesList = ({ properties, onRefresh }) => {
  const [editingProperty, setEditingProperty] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
  })

  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      price: property.price,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editingProperty) return

    try {
      // Assuming there's an endpoint to update property
      await axios.put(`http://localhost:3001/listings/${editingProperty._id}`, formData)
      setEditingProperty(null)
      onRefresh()
    } catch (err) {
      console.error("Error updating property:", err)
    }
  }

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return

    try {
      // Assuming there's an endpoint to delete property
      await axios.delete(`http://localhost:3001/listings/${propertyId}`)
      onRefresh()
    } catch (err) {
      console.error("Error deleting property:", err)
    }
  }

  return (
    <div className="properties-list">
      {editingProperty ? (
        <div className="edit-form-container">
          <h3>Edit Property</h3>
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setEditingProperty(null)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Category</th>
                <th>Price</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td>
                    <div className="property-info">
                      <div className="property-image">
                        {property.listingPhotoPaths && property.listingPhotoPaths.length > 0 ? (
                          <img src={`http://localhost:3001/${property.listingPhotoPaths[0]}`} alt={property.title} />
                        ) : (
                          <div className="image-placeholder">No Image</div>
                        )}
                      </div>
                      <span>{property.title}</span>
                    </div>
                  </td>
                  <td>
                    {property.city}, {property.country}
                  </td>
                  <td>{property.category}</td>
                  <td>${property.price}/night</td>
                  <td>
                    {property.creator.firstName} {property.creator.lastName}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn" onClick={() => handleEdit(property)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(property._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PropertiesList
