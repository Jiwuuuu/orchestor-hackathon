/**
 * Processing Pipeline Demo Page
 * Shows multi-step pipeline with simulated progress
 */

'use client'

import { useState, useEffect } from 'react'
import { ProcessingPipeline, type PipelineStep } from '@/components/ai/processing-pipeline'
import { Button } from '@/components/ui/button'

const initialSteps: PipelineStep[] = [
  {
    id: 1,
    title: 'Parsing Tasks',
    description: 'Reading and extracting data from uploaded files',
    status: 'pending',
    progress: 0
  },
  {
    id: 2,
    title: 'Validating Content',
    description: 'Checking for missing assets, broken links, and format issues',
    status: 'pending',
    progress: 0
  },
  {
    id: 3,
    title: 'Enhancing Captions',
    description: 'AI-powered caption optimization for each platform',
    status: 'pending',
    progress: 0
  },
  {
    id: 4,
    title: 'Verifying Assets',
    description: 'Validating image formats, video quality, and file sizes',
    status: 'pending',
    progress: 0
  },
  {
    id: 5,
    title: 'Optimizing Schedule',
    description: 'Finding optimal posting times based on engagement patterns',
    status: 'pending',
    progress: 0
  }
]

export default function ProcessingPipelineDemoPage() {
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps)
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Simulated processing logic
  useEffect(() => {
    if (!isProcessing) return

    const currentStepData = steps.find(s => s.id === currentStep)
    if (!currentStepData) return

    if (currentStepData.status === 'pending') {
      // Start the step
      setSteps(prev => prev.map(step => 
        step.id === currentStep 
          ? { ...step, status: 'in_progress' as const, progress: 0 }
          : step
      ))
    } else if (currentStepData.status === 'in_progress') {
      // Progress the step
      const interval = setInterval(() => {
        setSteps(prev => {
          const step = prev.find(s => s.id === currentStep)
          if (!step || step.progress === undefined) return prev

          const newProgress = Math.min((step.progress || 0) + Math.random() * 15 + 10, 100)
          
          if (newProgress >= 100) {
            // Complete the step and add result
            clearInterval(interval)
            
            const results = [
              '15 tasks parsed',
              '3 issues found',
              '15 captions enhanced',
              '12 assets verified',
              'Schedule optimized'
            ]

            return prev.map(s => 
              s.id === currentStep
                ? { ...s, status: 'complete' as const, progress: 100, result: results[currentStep - 1] }
                : s
            )
          }

          // Update progress with intermediate results
          const intermediateResults = [
            [`${Math.floor(newProgress / 7)} tasks parsed`, '12/15 tasks parsed', '15 tasks parsed'],
            ['Checking assets...', '8/15 validated', '3 issues found'],
            [`${Math.floor(newProgress / 7)} captions done`, '10/15 enhanced', '15 captions enhanced'],
            ['Analyzing images...', '8/12 verified', '12 assets verified'],
            ['Calculating times...', 'Analyzing engagement', 'Schedule optimized']
          ]

          const progressResults = intermediateResults[currentStep - 1]
          const resultIndex = Math.floor(newProgress / 33)
          const result = progressResults[Math.min(resultIndex, progressResults.length - 1)]

          return prev.map(s => 
            s.id === currentStep
              ? { ...s, progress: newProgress, result }
              : s
          )
        })
      }, 500)

      return () => clearInterval(interval)
    } else if (currentStepData.status === 'complete') {
      // Move to next step
      if (currentStep < steps.length) {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1)
        }, 800)
      } else {
        // All steps complete
        setIsComplete(true)
        setIsProcessing(false)
      }
    }
  }, [isProcessing, currentStep, steps])

  const handleStart = () => {
    setSteps(initialSteps)
    setCurrentStep(1)
    setIsComplete(false)
    setIsProcessing(true)
  }

  const handleReset = () => {
    setSteps(initialSteps)
    setCurrentStep(1)
    setIsComplete(false)
    setIsProcessing(false)
  }

  const handleComplete = () => {
    console.log('Pipeline completed!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-[clamp(30px,5vw,60px)] px-[clamp(16px,3vw,30px)]">
      <div className="max-w-4xl mx-auto space-y-[clamp(30px,5vw,50px)]">
        {/* Header */}
        <div className="text-center space-y-[clamp(12px,1.5vw,16px)]">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-black uppercase tracking-tight">
            Processing Pipeline
          </h1>
          <p className="text-[clamp(16px,2vw,20px)] text-black/60 leading-relaxed max-w-3xl mx-auto">
            Multi-step pipeline visualization with animated progress indicators
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-[clamp(10px,1.5vw,12px)]">
          <Button
            onClick={handleStart}
            disabled={isProcessing}
            className="min-w-[140px]"
          >
            {isProcessing ? 'Processing...' : isComplete ? 'Start Again' : 'Start Processing'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={isProcessing}
          >
            Reset
          </Button>
        </div>

        {/* Pipeline */}
        <ProcessingPipeline
          steps={steps}
          currentStep={currentStep}
          onComplete={handleComplete}
        />

        {/* Demo Info */}
        <div className="p-[clamp(20px,3vw,30px)] bg-blue-50 border-2 border-blue-600 rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-[clamp(16px,2vw,18px)] font-bold text-blue-600 uppercase tracking-wider mb-[clamp(8px,1vw,10px)]">
            Pipeline Features
          </h3>
          <ul className="space-y-[clamp(6px,0.8vw,8px)] text-[clamp(13px,1.5vw,14px)] text-black/80">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>5 distinct processing steps with individual status tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Animated progress bars with spring physics (Framer Motion)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Checkmark animation with bounce effect when step completes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Rotating loader icon for active steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Subtle pulse animation on current step</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Real-time result updates: "12/15 tasks parsed", "3 issues found"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Status indicators: pending (gray), in-progress (blue), complete (green), error (red)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Connection lines between steps showing progression flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Completion celebration message with custom styling</span>
            </li>
          </ul>
        </div>

        {/* Usage Example */}
        <div className="p-[clamp(20px,3vw,30px)] bg-gray-100 border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-[clamp(16px,2vw,18px)] font-bold text-black uppercase tracking-wider mb-[clamp(8px,1vw,10px)]">
            Usage Example
          </h3>
          <pre className="text-[clamp(11px,1.3vw,12px)] bg-white p-[clamp(12px,1.5vw,14px)] border-2 border-black rounded-[5px] overflow-x-auto">
{`import { ProcessingPipeline } from '@/components/ai/processing-pipeline'

const [steps, setSteps] = useState<PipelineStep[]>([
  {
    id: 1,
    title: 'Parsing Tasks',
    description: 'Reading files...',
    status: 'in_progress',
    progress: 45,
    result: '8/15 tasks parsed'
  },
  // ... more steps
])

<ProcessingPipeline
  steps={steps}
  currentStep={1}
  onComplete={() => console.log('Done!')}
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
