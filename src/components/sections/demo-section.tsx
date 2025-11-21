'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function DemoSection() {
  const [inputData, setInputData] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Handle file upload when backend is ready
      console.log('File selected:', file.name)
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // TODO: Call API to analyze when backend is ready
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
    setIsAnalyzing(false)
    console.log('Analyzing:', inputData)
  }

  return (
    <section id="demo" className="bg-custom-green py-[clamp(80px,12vw,150px)] px-[clamp(20px,4vw,50px)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-[clamp(50px,7vw,90px)]">
          <h3 className="font-bold mb-4 text-[clamp(32px,4vw,56px)] uppercase tracking-tight">
            SEE IT IN ACTION
          </h3>
          <p className="text-[clamp(16px,1.8vw,20px)] text-black/70">
            Upload your Asana export and watch AI transform it into a publish-ready schedule
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-[10px] p-[clamp(30px,4vw,50px)] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
          <label className="block mb-4 font-bold text-[clamp(18px,2vw,24px)] uppercase tracking-wide">
            Paste your Asana export (CSV/JSON)
          </label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full h-[200px] p-4 border-2 border-black rounded-[5px] mb-4 resize-none font-mono text-[14px] focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Task Name, Due Date, Platform, Caption, Asset Link, Product Launch, 2024-11-20, Instagram, Check out our new feature!, https://dropbox.com/..."
          />

          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6 p-4 bg-gray-50 border-2 border-black rounded-[5px]">
            <span className="text-[clamp(14px,1.5vw,16px)] font-bold">Or upload file:</span>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              className="text-[clamp(14px,1.5vw,16px)]"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputData}
            variant="secondary"
            size="lg"
            className="w-full bg-black text-custom-green hover:bg-gray-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all text-[clamp(16px,1.8vw,20px)] py-6"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Content...
              </span>
            ) : (
              'Analyze Content with AI'
            )}
          </Button>
        </div>

        {/* Results Preview */}
        <div className="bg-white rounded-[10px] p-[clamp(30px,4vw,50px)] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <h4 className="font-bold text-[clamp(18px,2vw,24px)] uppercase tracking-wide">
              READY TO PUBLISH
            </h4>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-black rounded-[8px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,16px)] mb-3 font-bold">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-purple-700">Nov 20, 11:00 AM - Instagram</span>
              </div>
              <p className="text-[clamp(14px,1.5vw,18px)] font-medium mb-2">
                Game-changer alert! Our new feature is here and it's incredible...
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[clamp(11px,1.3vw,13px)] px-2 py-1 bg-white border border-black rounded-[5px] font-mono">
                  #ProductLaunch
                </span>
                <span className="text-[clamp(11px,1.3vw,13px)] px-2 py-1 bg-white border border-black rounded-[5px] font-mono">
                  #Innovation
                </span>
                <span className="text-[clamp(11px,1.3vw,13px)] px-2 py-1 bg-green-100 border border-green-600 rounded-[5px] font-bold text-green-700">
                  ✓ AI Enhanced
                </span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-black rounded-[8px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,16px)] mb-3 font-bold">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-blue-700">Nov 21, 2:00 PM - Facebook</span>
              </div>
              <p className="text-[clamp(14px,1.5vw,18px)] font-medium mb-2">
                Big news! We're excited to announce something amazing for our community...
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[clamp(11px,1.3vw,13px)] px-2 py-1 bg-green-100 border border-green-600 rounded-[5px] font-bold text-green-700">
                  ✓ Asset Verified
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/upload"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-black text-custom-green rounded-[5px] font-bold hover:bg-gray-800 transition-colors text-[clamp(14px,1.5vw,16px)] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            View Full Schedule
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/auth"
            className="inline-block px-[clamp(30px,4vw,60px)] py-[clamp(16px,2vw,20px)] bg-black text-custom-green rounded-[8px] font-bold hover:bg-gray-800 transition-all text-[clamp(16px,2vw,22px)] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] uppercase tracking-wide"
          >
            Sign up to save & export your results →
          </Link>
        </div>
      </div>
    </section>
  )
}
