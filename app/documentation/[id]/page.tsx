import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

type Article = {
  _id: string
  title: string
  content: string
  author: string
  category: string
  createdAt?: string
  imageUrl?: string
  pdfUrl?: string
  videoUrl?: string
}

export default async function DocumentationDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch("http://localhost:3000/api/docs", { cache: "no-store" })

  if (!res.ok) return notFound()

  const data: Article[] = await res.json()
  const article = data.find(doc => doc._id === params.id)

  if (!article) return notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/documentation">
        <Button variant="outline" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Button>
      </Link>

      {/* Title and Metadata */}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {article.author}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "Unknown date"}
        </div>
        <Badge variant="secondary">{article.category}</Badge>
      </div>

      {/* Content */}
      <p className="text-lg leading-relaxed mb-6">{article.content}</p>

      {/* Media Previews */}
      {article.imageUrl && (
        <Image
          src={article.imageUrl}
          alt="Article image"
          width={800}
          height={400}
          className="rounded shadow mb-6"
        />
      )}

      {article.pdfUrl && (
        <iframe
          src={article.pdfUrl}
          className="w-full h-96 border rounded mb-6"
          title="PDF Preview"
        />
      )}

      {article.videoUrl && (
        <video
          src={article.videoUrl}
          controls
          className="w-full rounded border"
        />
      )}
    </div>
  )
}
