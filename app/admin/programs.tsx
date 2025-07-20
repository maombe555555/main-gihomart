"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPrograms() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-orange-700">Programs Management</h1>
      <p className="mb-4 text-gray-700">Here you can add, edit, or remove programs.</p>

      {/* HISTORICAL TOURS Section */}
      <section className="mb-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">HISTORICAL TOURS</h2>
        <p className="text-gray-700">
          Uncover the fascinating history of Rwanda's powerful Queen Nyagakecuru and Ruganzu II Ndoli. Hike through stunning landscapes and historical sites as you unravel the mysteries of Rwanda's past.
        </p>
      </section>
      <hr className="my-2 border-gray-200" />

      {/* RESEARCH Section */}
      <section className="mb-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">RESEARCH</h2>
        <p className="text-gray-700">
          We actively discover, research, network, and publish historical sites dedicated to the legacy of King Ruganzu II Ndoli and his royal army IBISUMIZI, ensuring that these invaluable cultural treasures are preserved for future generations.
        </p>
      </section>
      <hr className="my-2 border-gray-200" />

      {/* INTERNSHIPS Section */}
      <section className="mb-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">INTERNSHIPS</h2>
        <p className="text-gray-700">
          We offer internship opportunities for students and professionals seeking hands-on experience in community-based tourism, conservation, and cultural heritage management.
        </p>
      </section>

      {/* RICE PLANTATION TOUR Section */}
      <section className="mb-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">RICE PLANTATION TOUR</h2>
        <p className="text-gray-700">
          Visit local rice fields and learn about the traditional and modern rice cultivation and harvesting techniques. Engage with farmers and gain insights into Rwandan's agricultural heritage.
        </p>
      </section>
      <hr className="my-2 border-gray-200" />

      {/* BANANA BREWING Section */}
      <section className="mb-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">BANANA BREWING</h2>
        <p className="text-gray-700">
          Discover the art of traditional banana beer brewing, a cherished Rwandan cultural practice. Participate in the brewing process and enjoy the unique taste of this local specialty.
        </p>
      </section>
      <hr className="my-2 border-gray-200" />

      {/* Placeholder for program management UI */}
      <div className="bg-white p-6 rounded shadow text-gray-400">Program management coming soon...</div>
    </div>
  )
} 