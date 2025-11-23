/**
 * Processing Pipeline Component
 * Multi-step pipeline visualization with animated progress
 */

"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Check, Loader2, AlertCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HourglassLoader } from "@/components/ui/hourglass-loader";

export interface PipelineStep {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "complete" | "error";
  progress?: number; // 0-100 for in_progress
  result?: string; // "12 tasks parsed", "3 issues found"
}

export interface ProcessingPipelineProps {
  steps: PipelineStep[];
  currentStep: number;
  onComplete?: () => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-300",
  },
  in_progress: {
    icon: Loader2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-600",
  },
  complete: {
    icon: Check,
    color: "text-green-600",
    bgColor: "bg-custom-green",
    borderColor: "border-green-600",
  },
  error: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-600",
  },
};

function StepIndicator({
  step,
  isActive,
}: {
  step: PipelineStep;
  isActive: boolean;
}) {
  const config = statusConfig[step.status];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: isActive ? 1.05 : 1,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`
        relative flex items-center justify-center
        w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]
        ${config.bgColor} border-2 ${config.borderColor} rounded-[5px]
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ${isActive ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""}
        transition-shadow
      `}
    >
      {/* Step Number Background */}
      <div
        className={`
        absolute inset-0 flex items-center justify-center
        text-[clamp(18px,2.5vw,24px)] font-bold ${config.color}
        ${step.status === "complete" ? "opacity-0" : "opacity-30"}
        transition-opacity duration-300
      `}
      >
        {/* {step.id} */}
      </div>

      {/* Status Icon */}
      {step.status === "in_progress" ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Icon
            className={`w-[clamp(24px,3vw,32px)] h-[clamp(24px,3vw,32px)] ${config.color}`}
          />
        </motion.div>
      ) : step.status === "complete" ? (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <Icon
            className={`w-[clamp(28px,3.5vw,36px)] h-[clamp(28px,3.5vw,36px)] ${config.color} stroke-3`}
          />
        </motion.div>
      ) : (
        <Icon
          className={`w-[clamp(24px,3vw,32px)] h-[clamp(24px,3vw,32px)] ${config.color}`}
        />
      )}

      {/* Pulse Effect for Active Step */}
      {isActive && step.status === "in_progress" && (
        <motion.div
          className={`absolute inset-0 ${config.bgColor} border-2 ${config.borderColor} rounded-[5px]`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleX = useTransform(smoothProgress, [0, 100], [0, 1]);

  return (
    <div className="w-full h-2 bg-gray-200 border-2 border-black rounded-[5px] overflow-hidden">
      <motion.div
        className="h-full bg-blue-600"
        style={{ scaleX, transformOrigin: "0% 0%" }}
      />
    </div>
  );
}

export function ProcessingPipeline({
  steps,
  currentStep,
  onComplete,
}: ProcessingPipelineProps) {
  const allComplete = steps.every((step) => step.status === "complete");

  useEffect(() => {
    if (allComplete && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allComplete, onComplete]);

  return (
    <Card className="p-[clamp(24px,3vw,40px)] border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
      {/* Header */}
      <div className="mb-[clamp(24px,3vw,32px)] text-center">
        <h2 className="text-[clamp(20px,3vw,28px)] font-bold text-black uppercase tracking-wide mb-[clamp(8px,1vw,10px)]">
          Processing Your Tasks
        </h2>
        {/* <p className="text-[clamp(13px,1.5vw,14px)] text-black/60">
          {allComplete
            ? "✓ All steps completed successfully!"
            : `Step ${currentStep} of ${steps.length}`}
        </p> */}
      </div>

      {/* Pipeline Steps */}
      <div className="space-y-[clamp(16px,2vw,20px)]">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const config = statusConfig[step.status];

          return (
            <motion.div
              key={step.id}
              layout
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[clamp(24px,3vw,32px)] top-[clamp(48px,6vw,64px)] bottom-[-clamp(16px,2vw,20px)] w-0.5 bg-gray-300 z-0" />
              )}

              <div className="flex items-start gap-[clamp(12px,1.5vw,16px)] relative z-10">
                {/* Step Indicator */}
                <StepIndicator step={step} isActive={isActive} />

                {/* Step Content */}
                <div className="flex-1">
                  <div
                    className={`
                    p-[clamp(12px,1.5vw,16px)] 
                    ${config.bgColor} border-2 ${
                      config.borderColor
                    } rounded-[5px]
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    ${isActive ? "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : ""}
                    transition-shadow
                  `}
                  >
                    <div className="flex items-start justify-between mb-[clamp(4px,0.5vw,6px)]">
                      <h3 className="text-[clamp(15px,2vw,18px)] font-bold text-black">
                        {step.title}
                      </h3>
                      {step.result && step.status === "complete" && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-[clamp(11px,1.3vw,12px)] font-bold text-green-600 uppercase tracking-wider"
                        >
                          {step.result}
                        </motion.span>
                      )}
                      {step.status === "error" && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-[clamp(11px,1.3vw,12px)] font-bold text-red-600 uppercase tracking-wider"
                        >
                          Failed
                        </motion.span>
                      )}
                    </div>

                    <p className="text-[clamp(12px,1.4vw,13px)] text-black/70 mb-[clamp(8px,1vw,10px)]">
                      {step.description}
                    </p>

                    {/* Progress Bar for In Progress */}
                    {step.status === "in_progress" &&
                      step.progress !== undefined && (
                        <div className="space-y-[clamp(4px,0.5vw,6px)]">
                          <ProgressBar progress={step.progress} />
                          <div className="flex justify-between text-[clamp(10px,1.2vw,11px)] font-bold text-black/60">
                            <span>Processing...</span>
                            <span>{step.progress}%</span>
                          </div>
                        </div>
                      )}

                    {/* Result Message */}
                    {step.result && step.status === "in_progress" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[clamp(11px,1.3vw,12px)] text-blue-600 font-medium mt-[clamp(6px,0.8vw,8px)]"
                      >
                        {step.result}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Processing Message */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-[clamp(24px,3vw,32px)] flex flex-col items-center justify-center"
        >
          <HourglassLoader />
          <p className="text-[clamp(13px,1.5vw,15px)] text-black/70 mt-2 text-center max-w-md">
            Please stay here while we process all the data
          </p>
        </motion.div>
      )}
    </Card>
  );
}
