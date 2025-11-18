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
      <div className="max-w-[900px] mx-auto">
        <h3 className="text-center mb-[clamp(40px,6vw,80px)] font-bold text-[clamp(32px,4vw,48px)]">
          SEE IT IN ACTION
        </h3>

        {/* Input Section */}
        <div className="bg-white rounded-[10px] p-[clamp(30px,4vw,50px)] border-2 border-black mb-8">
          <label className="block mb-4 font-bold text-[clamp(16px,2vw,20px)]">
            Paste your Asana export (CSV/JSON)
          </label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full h-[200px] p-4 border-2 border-black rounded-[5px] mb-4 resize-none font-mono text-[14px]"
            placeholder="Paste your Asana task data here..."
          />

          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            <span className="text-[clamp(14px,1.5vw,16px)]">Or upload file:</span>
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
            className="w-full bg-black text-custom-green hover:bg-gray-800"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
          </Button>
        </div>

        {/* Results Preview */}
        <div className="bg-white rounded-[10px] p-[clamp(30px,4vw,50px)] border-2 border-black">
          <h4 className="font-bold mb-6 text-[clamp(18px,2vw,24px)]">
            READY TO PUBLISH
          </h4>

          <div className="space-y-4">
            <div className="border-b-2 border-gray-200 pb-4">
              <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,16px)] mb-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Nov 20, 11:00 AM - Instagram
              </div>
              <p className="text-[clamp(14px,1.5vw,18px)]">
                ✨ Game-changer alert! Our new...
              </p>
              <p className="text-[clamp(12px,1.5vw,14px)] text-gray-600 mt-1">
                #ProductLaunch #Innovation
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,16px)] mb-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Nov 21, 2:00 PM - Facebook
              </div>
              <p className="text-[clamp(14px,1.5vw,18px)]">
                Big news! We're excited to...
              </p>
            </div>
          </div>

          <Link
            href="#"
            className="inline-block mt-6 text-black underline hover:no-underline text-[clamp(14px,1.5vw,16px)]"
          >
            View Full Schedule →
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link
            href="#"
            className="inline-block px-[clamp(30px,4vw,50px)] py-[15px] bg-black text-custom-green rounded-[5px] font-bold hover:bg-gray-800 transition-colors text-[clamp(16px,2vw,20px)]"
          >
            Sign up to save & export your results →
          </Link>
        </div>
      </div>
    </section>
  )
}
