import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [type, setType] = useState("product");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="w-full max-w-xl shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Add New {type.charAt(0).toUpperCase() + type.slice(1)}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex items-center justify-center">
            <label className="font-semibold mr-3 text-gray-700">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
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
              className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
            <Input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
            {type === "product" && (
              <Input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            )}
            {type === "program" && (
              <Input
                name="schedule"
                value={form.schedule}
                onChange={handleChange}
                placeholder="Schedule"
                className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            )}
            {type === "documentation" && (
              <Textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Full Content"
                className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow-md"
            >
              Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
