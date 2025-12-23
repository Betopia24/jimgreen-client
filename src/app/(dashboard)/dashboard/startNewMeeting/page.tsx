"use client"
import Step1 from '@/components/startNewMeeting/Step1';
import Step2 from '@/components/startNewMeeting/Step2';
import Step3 from '@/components/startNewMeeting/Step3';
import Step4 from '@/components/startNewMeeting/Step4';
import Step5 from '@/components/startNewMeeting/Step5';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const StartNewMeeting = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter()

  const steps = [
    { id: 1, title: 'Step 1', component: <Step1 /> },
    { id: 2, title: 'Step 2', component: <Step2 /> },
    { id: 3, title: 'Step 3', component: <Step3 /> },
    { id: 4, title: 'Step 4', component: <Step4 /> },
    { id: 5, title: 'Step 5', component: <Step5 /> },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      router.push(`/dashboard/startNewMeeting?step=${currentStep + 1}`)
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      router.push(`/dashboard/startNewMeeting?step=${currentStep - 1}`)
    }
  };

  // const handleStepClick = (stepId: any) => {
  //   setCurrentStep(stepId);
  // };

  return (
    <div className="py-6">
      <div className="stepper-wrapper">
        {/* Step circles with arrow */}
        <div className="steps-row">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div
                className={`step-circle ${currentStep >= step.id ? 'active' : 'inactive'
                  }`}
              // onClick={() => handleStepClick(step.id)}
              >
                {step.id}
              </div>
              {/* Arrow between current and next step */}
              {currentStep === step.id && index < steps.length - 1 && (
                <div className="arrow-between">
                  {/* <svg width="150" height="20" viewBox="0 0 150 20" fill="none">
                                        <line x1="0" y1="10" x2="140" y2="10" stroke="#5b51d4" strokeWidth="2" />
                                        <path d="M140 10L130 4L130 16L140 10Z" fill="#5b51d4" />
                                    </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="15" viewBox="0 0 101 15" fill="none">
                    <path d="M100.707 8.07088C101.098 7.68035 101.098 7.04719 100.707 6.65666L94.3431 0.292702C93.9526 -0.0978227 93.3195 -0.0978227 92.9289 0.292702C92.5384 0.683226 92.5384 1.31639 92.9289 1.70692L98.5858 7.36377L92.9289 13.0206C92.5384 13.4111 92.5384 14.0443 92.9289 14.4348C93.3195 14.8254 93.9526 14.8254 94.3431 14.4348L100.707 8.07088ZM0 7.36377V8.36377H100V7.36377V6.36377H0V7.36377Z" fill="#6E51E0" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar below */}
        <div className="progress-section">
          <div className="progress-bar-bg" />
          <div
            className="progress-bar-active"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      {/* show all compnents here  */}
      <div className="current-step-content">
        {steps.find(step => step.id === currentStep)?.component}
      </div>

      <div className="button-group">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="nav-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="nav-button"
        >
          Next
        </button>
      </div>
      <style jsx>{`
        .stepper-wrapper {
          position: relative;
          margin-bottom: 40px;
        }

        .steps-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .step-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .step-circle.active {
          background-color: #6E51E0;
          color: white;
        }

        .step-circle.inactive {
          background-color: #6E51E033;
          color: #2D2D2D;
        }

        .step-circle:hover {
          transform: scale(1.05);
        }

        .arrow-between {
          animation: slideRight 0.8s ease-in-out infinite;
        }

        @keyframes slideRight {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(6px);
            opacity: 0.7;
          }
        }

        .progress-section {
          position: relative;
          height: 4px;
          width: 100%;
        }

        .progress-bar-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          background-color: #d8d8dc;
          border-radius: 10px;
        }

        .progress-bar-active {
          position: absolute;
          top: 0;
          left: 0;
          height: 10px;
          background-color: #5b51d4;
          border-radius: 10px;
          transition: width 0.4s ease;
          z-index: 1;
        }

       .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
        }

        .nav-button {
          padding: 12px 28px;
          background-color: #6E51E0;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(91, 81, 212, 0.3);
        }

        .nav-button:hover:not(:disabled) {
          background-color: #6E51E0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(91, 81, 212, 0.4);
        }

        .nav-button:disabled {
          background-color: #d1d1d1;
          cursor: not-allowed;
          opacity: 0.5;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default StartNewMeeting;