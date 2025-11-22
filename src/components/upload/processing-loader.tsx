'use client'

import { useState, useEffect } from 'react'
import { ProcessingPipeline, type PipelineStep } from '@/components/ai/processing-pipeline'

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

export function ProcessingLoader({ onComplete }: { onComplete?: () => void }) {
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps)
  const [currentStep, setCurrentStep] = useState(1)

  // Simulated processing logic
  useEffect(() => {
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
      }
    }
  }, [currentStep, steps])

  return (
    <ProcessingPipeline
      steps={steps}
      currentStep={currentStep}
      onComplete={onComplete}
    />
  )
}
