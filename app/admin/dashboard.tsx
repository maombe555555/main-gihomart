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
        title: "Success",
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
        title: "Error",
        description: `Failed to add ${type}.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
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
    </div>
  );
}
