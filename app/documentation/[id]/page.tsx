import { dbConnect } from "@/lib/mongodb"
import Documentation, { DocumentationType } from "@/models/Documentation"

export default async function DocumentationPage({ params }: { params: { id: string } }) {
  await dbConnect()

  // Tell TS what type to expect
  const doc = (await Documentation.findById(params.id).lean()) as DocumentationType | null

  if (!doc) {
    return <div>Documentation not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>
      <p className="text-lg mb-6">{doc.content}</p>
      <p className="text-sm text-gray-600">Author: {doc.author}</p>
      <p className="text-sm text-gray-600">Category: {doc.category}</p>
      {doc.createdAt && (
        <p className="text-sm text-gray-500">
          Created: {new Date(doc.createdAt).toLocaleDateString()}
        </p>
      )}

      {doc.pdfUrl && (
        <div className="mt-6">
          <h3 className="font-semibold">PDF Document:</h3>
          <iframe src={doc.pdfUrl} className="w-full h-96 border rounded-lg shadow" />
        </div>
      )}

      {doc.image && (
        <div className="mt-6">
          <h3 className="font-semibold">Image:</h3>
          <img src={doc.image} alt={doc.title} className="rounded shadow max-w-full" />
        </div>
      )}

      {doc.video && (
        <div className="mt-6">
          <h3 className="font-semibold">Video:</h3>
          <video controls className="w-full rounded shadow">
            <source src={doc.video} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  )
}
