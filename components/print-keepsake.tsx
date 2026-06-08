"use client"

import React, { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import birthdayData from '../data/birthday.json'
import messagesData from '../data/messages.json'
import galleryData from '../data/gallery.json'

function KeepsakeDocument() {
  return (
    <div className="space-y-6 p-6 text-black bg-white" style={{ width: 794 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Ella @ 20 — Keepsake</h1>
        <p className="text-sm text-slate-600">A printable archive of your birthday letter, traits, memories, and gallery captions.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Birthday Letter</h2>
        <p className="mb-3">{birthdayData.letter.opening}</p>
        {birthdayData.letter.paragraphs.map((paragraph: string, index: number) => (
          <p key={index} className="mb-2 leading-6">
            {paragraph}
          </p>
        ))}
        {birthdayData.letter.prayers?.length ? (
          <div className="mt-4">
            <p className="font-semibold mb-2">Prayers</p>
            {birthdayData.letter.prayers.map((prayer: string, index: number) => (
              <p key={`prayer-${index}`} className="mb-2 leading-6">{prayer}</p>
            ))}
          </div>
        ) : null}
        {birthdayData.letter.careerGoals?.length ? (
          <div className="mt-4">
            <p className="font-semibold mb-2">Career Goals</p>
            {birthdayData.letter.careerGoals.map((goal: string, index: number) => (
              <p key={`goal-${index}`} className="mb-2 leading-6">{goal}</p>
            ))}
          </div>
        ) : null}
        {birthdayData.letter.wishes?.length ? (
          <div className="mt-4">
            <p className="font-semibold mb-2">Wishes</p>
            {birthdayData.letter.wishes.map((wish: string, index: number) => (
              <p key={`wish-${index}`} className="mb-2 leading-6">{wish}</p>
            ))}
          </div>
        ) : null}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Traits</h2>
        <div className="grid grid-cols-2 gap-2">
          {birthdayData.traits.slice(0, 20).map((trait: any, index: number) => (
            <div key={index} className="rounded-xl border border-slate-200 p-3 bg-slate-50">
              <p className="font-semibold">{trait.name}</p>
              <p className="text-sm leading-5 text-slate-700">{trait.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        <div className="space-y-3">
          {messagesData.messages.map((message: any, index: number) => (
            <div key={index} className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <p className="font-semibold">{message.from}</p>
              <p className="text-sm leading-6 text-slate-700">{message.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Gallery Captions</h2>
        <div className="space-y-3">
          {galleryData.galleryGroups.map((group: any, groupIndex: number) => (
            <div key={groupIndex}>
              <p className="font-semibold mb-1">{group.title}</p>
              <ul className="list-disc list-inside text-sm leading-6 text-slate-700">
                {group.photos.map((photo: any, photoIndex: number) => (
                  <li key={photoIndex}>{photo.caption}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function PrintKeepsake() {
  const [generating, setGenerating] = useState(false)
  const printRef = useRef<HTMLDivElement | null>(null)

  async function handleGenerate() {
    if (!printRef.current) return
    setGenerating(true)

    try {
      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgProps = pdf.getImageProperties(dataUrl)
      const imgWidth = pdfWidth
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width

      let position = 0
      if (imgHeight <= pdfHeight) {
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight)
      } else {
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight)
        let remainingHeight = imgHeight
        while (remainingHeight > pdfHeight) {
          remainingHeight -= pdfHeight
          position -= pdfHeight
          pdf.addPage()
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight)
        }
      }

      pdf.save('ella-keepsake.pdf')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('PDF generation failed', err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <>
      <div ref={printRef} className="invisible absolute left-[-9999px] top-0 opacity-0 pointer-events-none">
        <KeepsakeDocument />
      </div>
      <button
        onClick={handleGenerate}
        aria-label="Generate Keepsake PDF"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white/80 px-3 py-2 text-sm shadow-lg backdrop-blur"
      >
        {generating ? 'Generating…' : 'Keepsake PDF'}
      </button>
    </>
  )
}
