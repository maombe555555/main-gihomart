import dbConnect from "@/lib/mongodb"
import Documentation, { DocumentationType } from "@/models/Documentation"

export default async function DocumentationPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  try {
    // Await the params Promise first
    const { id } = await params
    
    await dbConnect()
    console.log('Database connected successfully')

    // Validate the ID format (important for MongoDB ObjectId)
    if (!id || id.length !== 24) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Documentation ID</h1>
          <p className="text-gray-600">The documentation ID format is invalid.</p>
        </div>
      )
    }

    const doc = await Documentation.findById(id).lean() as DocumentationType | null

    if (!doc) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-red-600">Documentation Not Found</h1>
          <p className="text-gray-600">The requested documentation does not exist.</p>
        </div>
      )
    }

    return (
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>
        <div className="prose max-w-none mb-6">
          <p className="text-lg whitespace-pre-wrap">{doc.content}</p>
        </div>
        <div className="border-t pt-4 space-y-2">
          <p className="text-sm text-gray-600"><span className="font-semibold">Author:</span> {doc.author}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Category:</span> {doc.category}</p>
          {doc.createdAt && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Created:</span> {new Date(doc.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {doc.pdfUrl && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">PDF Document:</h3>
            <iframe 
              src={doc.pdfUrl} 
              className="w-full h-96 border rounded-lg shadow"
              title={`PDF: ${doc.title}`}
            />
          </div>
        )}

        {doc.image && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Image:</h3>
            <img 
              src={doc.image} 
              alt={doc.title} 
              className="rounded shadow max-w-full h-auto max-h-96 object-contain"
            />
          </div>
        )}

        {doc.video && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Video:</h3>
            <video controls className="w-full rounded shadow max-h-96">
              <source src={doc.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error in DocumentationPage:', error)
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Documentation</h1>
        <p className="text-gray-600">There was a problem loading the documentation. Please try again later.</p>
        <details className="mt-4 text-left text-sm text-gray-500">
          <summary>Technical Details</summary>
        
        </details>
      </div>
    )
  }
}