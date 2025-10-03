"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Menu, X } from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [type, setType] = useState("product");
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    schedule: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let endpoint = "/api/products";
    if (type === "program") endpoint = "/api/programs";
    if (type === "documentation") endpoint = "/api/docs";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast({
        title: "✅ Success",
        description: `${type} added successfully!`,
      });
      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
        schedule: "",
        content: "",
      });
    } else {
      toast({
        title: "❌ Error",
        description: `Failed to add ${type}.`,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
        <div className="p-6 font-bold text-lg border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Products
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Programs
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Documentation
          </button>
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-sm flex items-center justify-between p-4 z-50">
        <div className="font-bold">Admin Panel</div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-white shadow-md z-40 p-4 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Products
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Programs
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Documentation
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 mt-14 md:mt-0 flex justify-center">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">
              Add New {type.charAt(0).toUpperCase() + type.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row items-center sm:justify-center gap-2">
              <label className="font-medium">Type:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                name="type"
                className="w-full sm:w-auto border rounded px-3 py-2"
              >
                <option value="product">Product</option>
                <option value="program">Program</option>
                <option value="documentation">Documentation</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full"
              />
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full"
              />
              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full"
              />
              {type === "product" && (
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full"
                />
              )}
              {type === "program" && (
                <Input
                  name="schedule"
                  value={form.schedule}
                  onChange={handleChange}
                  placeholder="Schedule"
                  className="w-full"
                />
              )}
              {type === "documentation" && (
                <Textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Full Content"
                  className="w-full"
                />
              )}

              <Button type="submit" className="w-full">
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
