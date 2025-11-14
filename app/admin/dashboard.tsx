import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
  
export default function AdminOverview() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch("/api/users").then(res => res.json()).then(setUsers);
    fetch("/api/products").then(res => res.json()).then(setProducts);
    fetch("/api/programs").then(res => res.json()).then(setPrograms);
    fetch("/api/docs").then(res => res.json()).then(setDocs);
    fetch("/api/ads").then(res => res.json()).then(setAdvertisements);
    fetch("/api/contact").then(res => res.json()).then(setContacts);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 grid gap-8">
      <Card>
        <CardHeader><CardTitle>Users</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 font-bold">Total: {users.length}</div>
          <ul>{users.map((u:any) => <li key={u.email}>{u.email} ({u.role})</li>)}</ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Products</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 font-bold">Total: {products.length}</div>
          <ul>{products.map((p:any) => <li key={p._id || p.name}>{p.name}</li>)}</ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Programs</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 font-bold">Total: {programs.length}</div>
          <ul>{programs.map((p:any) => <li key={p._id || p.name}>{p.name}</li>)}</ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Documentation</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-2 font-bold">Total: {docs.length}</div>
          <ul>{docs.map((d:any) => <li key={d._id || d.title}>{d.title || d.name}</li>)}</ul>
        </CardContent>
      </Card>
    </div>
  );
}
function setAdvertisements(value: any) {
  throw new Error("Function not implemented.");
}
function setContacts(value: any): any[] {
  // Normalize incoming payload to an array of contacts
  const contacts = Array.isArray(value) ? value : value ? [value] : [];

  // Cache normalized contacts on window for simple debugging/inspection
  try {
    (window as any).__gihomart_contacts = contacts;
  } catch {
    // ignore if window is not writable (e.g., non-browser env)
  }

  return contacts;
}
