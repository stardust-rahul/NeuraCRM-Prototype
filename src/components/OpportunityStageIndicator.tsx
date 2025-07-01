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


export default function OpportunityStageIndicator({ currentStage }) {
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className="flex items-center w-full">
      {stages.map((stage, index) => {
        if (!stage) return null;
        return (
          <Stage 
            key={stage}
            name={stage}
            isFirst={index === 1}
            isLast={index === stages.length - 1}
            isActive={index === currentIndex}
            isCompleted={index < currentIndex}
          />
        );
      })}
    </div>
  );
}; 