"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    } else {
      fetchProducts()
    }
  }, [router])

  function fetchProducts() {
    setLoading(true)
    setError("")
    fetch("/api/products")
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to load products")
        }
        return res.json()
      })
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  function handleAddProduct(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price: parseFloat(price), image }),
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to add product")
        }
        setName("")
        setDescription("")
        setPrice("")
        setImage("")
        fetchProducts()
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  // Clear error on input change
  function handleInputChange(setter: (value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("")
      setter(e.target.value)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <form onSubmit={handleAddProduct} className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          value={name}
          onChange={handleInputChange(setName)}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          value={description}
          onChange={handleInputChange(setDescription)}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          value={price}
          onChange={handleInputChange(setPrice)}
          placeholder="Price"
          type="number"
          min="0"
          step="0.01"
          className="border p-2 rounded"
          required
        />
        <input
          value={image}
          onChange={handleInputChange(setImage)}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Add
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div>Loading...</div>}
      <ul>
        {products.map((product: any) => (
          <li key={product._id} className="mb-2">
            <strong>{product.name}</strong> - {product.description} (${product.price})
            {product.image && <img src={product.image} alt={product.name} className="h-8 inline ml-2" />}
          </li>
        ))}
      </ul>
    </div>
  )
} 