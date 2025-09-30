"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const data = {
      firstName: (form.querySelector<HTMLInputElement>("#firstName")?.value || "").trim(),
      lastName: (form.querySelector<HTMLInputElement>("#lastName")?.value || "").trim(),
      email: (form.querySelector<HTMLInputElement>("#email")?.value || "").trim(),
      phone: (form.querySelector<HTMLInputElement>("#phone")?.value || "").trim(),
      subject: (form.querySelector<HTMLInputElement>("#subject")?.value || "").trim(),
      message: (form.querySelector<HTMLTextAreaElement>("#message")?.value || "").trim(),
    }
    try {
      setSubmitting(true)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to send message")
      form.reset()
      alert("Message sent! We'll get back to you within 24 hours.")
    } catch (err) {
      alert("Failed to send message. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-100">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="MAOMBE" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="EMMANUEL" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="maombe@example.com" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" required />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} required />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                      <Send className="w-4 h-4 mr-2" />
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-muted-foreground">
                        123 Travel Street
                        <br />
                        Adventure City
                        <br />
                        HUYE-SOVU
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Numbers</h3>
                      <p className="text-muted-foreground">
                        Main:+250 729 953 364
                        <br />
                        Emergency:+250 788 440 243
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Addresses</h3>
                      <p className="text-muted-foreground">
                        General: gihomart@250gmail.com
                        <br />
                        Bookings: gihomart@250gmail.com
                        <br />
                        Support:gihomart@250gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 11:00 PM
                        <br />
                        Saturday: 10:00 AM - 11:00 PM
                        <br />
                        Sunday:  10:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">How far in advance should I book?</h4>
                    <p className="text-sm text-muted-foreground">
                    
                        We recommend booking at least 2-3 weeks in advance for both international and local.                   </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">What's included in the tour packages?</h4>
                    <p className="text-sm text-muted-foreground">
                      Our packages typically include accommodation, guided tours, some meals, and transportation.
                      Specific inclusions vary by destination.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Do you offer travel insurance?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, we partner with leading insurance providers to offer comprehensive travel insurance options
                      for all our travelers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
