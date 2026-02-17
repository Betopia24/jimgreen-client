"use client"
import React, { useState } from 'react'
import ManualEntryForm from './ManualEntryForm'
import PageHeader from '../PageHeader'
import UseSavedReportForm from './UseSavedReportForm'

function WaterChemistrySection() {
  const [inputMethod, setInputMethod] = useState("manual");
  return (
    <div>
      <PageHeader title='Water Chemistry' description='Enter water chemistry parameters manually' />
      {/* ── Input Method Toggle Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Input Method
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setInputMethod("manual")}
            className={`
                py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200
                ${inputMethod === "manual"
                ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }
              `}
          >
            Manual Entry
          </button>
          <button
            type="button"
            onClick={() => setInputMethod("saved")}
            className={`
                py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200
                ${inputMethod === "saved"
                ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }
              `}
          >
            Use Saved Report
          </button>
        </div>
      </div>

      {/* ── Content Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {inputMethod === "manual" ? <ManualEntryForm /> : <UseSavedReportForm />}
      </div>
    </div>
  )
}

export default WaterChemistrySection