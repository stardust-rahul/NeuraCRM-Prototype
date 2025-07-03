import React from 'react';
import { Check } from 'lucide-react';

interface ProgressTimelineProps {
  stages: string[];
  currentStage: string;
  onStageChange?: (stage: string) => void;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ stages, currentStage, onStageChange }) => {
  const currentIdx = stages.findIndex(s => s.toLowerCase() === currentStage.toLowerCase());

  return (
    <div className="flex w-full rounded-md overflow-hidden border border-gray-200">
      {stages.map((stage, idx) => {
        const isCompleted = idx < currentIdx;
        const isActive = idx === currentIdx;
        const isFirst = idx === 0;
        const isLast = idx === stages.length - 1;

        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-600';
        let hoverBgColor = 'hover:bg-gray-200';

        if (isCompleted) {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
          hoverBgColor = 'hover:bg-blue-200';
        }
        if (isActive) {
          bgColor = 'bg-blue-600';
          textColor = 'text-white';
          hoverBgColor = 'hover:bg-blue-700';
        }
        
        return (
          <div
            key={stage}
            className={`relative flex-1 flex items-center justify-center h-10 text-sm font-medium cursor-pointer transition-colors duration-200 ${bgColor} ${textColor} ${hoverBgColor}`}
            style={{
              clipPath: isLast 
                ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 1rem 50%)' 
                : 'polygon(0 0, calc(100% - 1rem) 0, 100% 50%, calc(100% - 1rem) 100%, 0 100%, 1rem 50%)',
              marginLeft: isFirst ? '0' : '-1rem',
              paddingLeft: isFirst ? '0.5rem' : '1.5rem',
              paddingRight: isLast ? '0.5rem' : '1rem',
            }}
            onClick={() => onStageChange && onStageChange(stage)}
          >
            <div className="flex items-center z-10">
              {isCompleted && <Check className="w-4 h-4 mr-1.5 flex-shrink-0" />}
              <span className="truncate">{stage}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTimeline; 