import React from 'react';
import { Check } from 'lucide-react';

const stages = ["", "Propose", "Negotiate", "Closed"];

const Stage = ({ name, isFirst, isLast, isActive, isCompleted }) => {
  const baseClasses = "flex items-center justify-center h-10 text-sm font-semibold relative px-5";
  
  let stateClasses = "text-gray-500 bg-gray-200";
  if (isCompleted) {
    stateClasses = "text-green-800 bg-green-200";
  }
  if (isActive) {
    stateClasses = "text-white bg-blue-600";
  }

  const leftSide = (
    <div
      className={`absolute left-0 top-0 bottom-0 w-5 h-full 
        ${isCompleted ? 'bg-green-200' : isActive ? 'bg-blue-600' : 'bg-gray-200'} 
        ${isFirst ? 'rounded-l-md' : ''}`}
      style={{
        clipPath: isFirst ? '' : 'polygon(0 0, 100% 50%, 0 100%)'
      }}
    />
  );
  
  const rightSide = (
     <div
      className={`absolute right-0 top-0 bottom-0 w-5 h-full 
        ${isCompleted ? 'bg-green-200' : isActive ? 'bg-blue-600' : 'bg-gray-200'} 
        ${isLast ? 'rounded-r-md' : ''}`}
      style={{
        clipPath: isLast ? '' : 'polygon(100% 0, 0 50%, 100% 100%)',
        transform: 'translateX(100%)',
        zIndex: 1,
      }}
    />
  );

  return (
    <div className="relative flex-1" style={{ minWidth: '120px' }}>
      <div className={`${baseClasses} ${stateClasses} ${isFirst ? 'rounded-l-md' : ''} ${isLast ? 'rounded-r-md' : ''}`}>
        {!isFirst && leftSide}
        <div className="z-10 flex items-center">
          {isCompleted && <Check className="w-4 h-4 mr-1" />}
          {name}
        </div>
      </div>
       {!isLast && rightSide}
    </div>
  );
};

interface ProgressTimelineProps {
  stages: string[];
  currentStage: string;
  startDate: string;
  onStageChange?: (stage: string) => void;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ stages, currentStage, startDate }) => {
  const currentIdx = stages.findIndex(
    (s) => s.toLowerCase() === currentStage.toLowerCase()
  );
  return (
    <div className="flex items-center space-x-2 text-xs font-medium">
      <span className="text-muted-foreground">START</span>
      <span className="text-muted-foreground">{startDate}</span>
      <div className="flex items-center ml-4 space-x-2">
        {stages.map((stage, idx) => (
          <span
            key={stage}
            className={`px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap
              ${idx === currentIdx ? "bg-blue-600 text-white font-bold" : "bg-gray-100 text-gray-800"}
            `}
          >
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressTimeline; 