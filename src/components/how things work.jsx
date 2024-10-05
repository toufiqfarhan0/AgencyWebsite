import { useRef, useEffect, useState } from 'react';
import propTypes from 'prop-types';

const steps = [
  { id: 1, text: "Step 1: Understanding the basics" },
  { id: 2, text: "Step 2: Setting up the environment" },
  { id: 3, text: "Step 3: Writing your first code" },
  { id: 4, text: "Step 4: Testing and debugging" },
  { id: 5, text: "Step 5: Deployment" }
];

const Step = ({ step, activeStep, index, progress }) => {
  return (
    <div className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
      <div className="w-40 text-center">
        <div className="p-4 bg-gray-200 rounded-md shadow-md">
          {step.text}
        </div>
      </div>
      <div className="flex flex-col items-center px-4">
        <div
          className={`flex items-center justify-center w-16 h-16 rounded-full border-[22px] 
            transition duration-300 ${activeStep >= index ? 'border-black' : 'border-neutral-300'} 
          `}
        >
        </div>
        {index !== steps.length - 1 &&
          <div className="relative w-0.5 h-20 bg-neutral-300">
            <div
              className="absolute top-0 w-full bg-black"
              style={{ height: `${progress}%` }}
            ></div>
          </div>}
      </div>
      <div className='w-40'>
      </div>
    </div>
  );
};

const ScrollStepper = () => {

  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      stepRefs.current.forEach((ref, index) => {
        if (ref.offsetTop <= scrollPosition) {
          setActiveStep(index);
          const nextStep = stepRefs.current[index + 1];
          if (nextStep) {
            const totalHeight = nextStep.offsetTop - ref.offsetTop;
            const scrolledHeight = scrollPosition - ref.offsetTop;
            setProgress((scrolledHeight / totalHeight) * 100);
          } else {
            setProgress(100);
          }
        }
        else if (index === 0) {
          setActiveStep(-1);
          setProgress(0);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className='flex justify-center'>
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={el => stepRefs.current[index] = el}
          >
            <Step step={step} activeStep={activeStep} index={index}
              progress={activeStep === index ? progress : activeStep > index ? 100 : 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

const HowThingsWork = () => {
  return (
    <>
      <div className="flex mt-36 mb-24 justify-center">
        <div className="text-7xl relative pr-24">
          How Things Work
          <img src="setting.png" className="absolute left-80 top-[-100px] w-64 z-[-1]" alt="setting" />
        </div>
      </div>
      <ScrollStepper />
    </>
  );
};

Step.propTypes = {
  step: propTypes.object.isRequired,
  activeStep: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
  progress: propTypes.number.isRequired
};

export default HowThingsWork;