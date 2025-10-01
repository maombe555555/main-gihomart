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
    content: ""
  });
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Set admin email if not present (simulate login)
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("adminEmail")) {
        localStorage.setItem("adminEmail", "maseemmy2000@gmail.com");
      }
      const adminEmail = localStorage.getItem("adminEmail");
      if (adminEmail === "maseemmy2000@gmail.com" || adminEmail === "gihomart250@gmail.com") {
        setIsAdmin(true);
      }
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let endpoint = "/api/products";
    if (type === "program") endpoint = "/api/programs";
    if (type === "documentation") endpoint = "/api/docs";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      toast({ title: "Success", description: `${type} added successfully!` });
      setForm({ name: "", description: "", image: "", price: "", schedule: "", content: "" });
    } else {
      toast({ title: "Error", description: `Failed to add ${type}.` });
    }
  };
  if (!isAdmin) {
    return <div className="max-w-xl mx-auto py-12 text-center text-red-600 font-bold">Access Denied: Admins Only</div>;
  }
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Add New {type.charAt(0).toUpperCase() + type.slice(1)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="font-semibold mr-2">Type:</label>
            <select value={type} onChange={handleChange} name="type" className="border rounded px-2 py-1">
              <option value="product">Product</option>
              <option value="program">Program</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
            <Input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
            {type === "product" && <Input name="price" value={form.price} onChange={handleChange} placeholder="Price" />}
            {type === "program" && <Input name="schedule" value={form.schedule} onChange={handleChange} placeholder="Schedule" />}
            {type === "documentation" && <Textarea name="content" value={form.content} onChange={handleChange} placeholder="Full Content" />}
            <Button type="submit">Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
