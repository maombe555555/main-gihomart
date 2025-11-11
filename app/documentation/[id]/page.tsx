import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"

type Article = {
  _id: string
  title: string
  content: string
  author: string
  category: string
  createdAt?: string
  image?: string
  pdfUrl?: string
  video?: string
}

export default async function DocumentationDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.gihomart.rw"}/api/docs/${params.id}`,
    { cache: "no-store" }
  )

  if (!res.ok) return notFound()

  const article: Article = await res.json()

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
      {article.image && (
        <Image
          src={article.image}
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

      {article.video && (
        <video src={article.video} controls className="w-full rounded border" />
      )}
    </div>
  )
}
