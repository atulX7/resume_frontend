import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DetailedEvaluation {
  criterion: string;
  description: string;
  score: number;
  status: 'green' | 'yellow' | 'red';
  assessment: string;
}

interface DetailCardProps {
  evaluation: DetailedEvaluation;
}

export function DetailCard({ evaluation }: DetailCardProps) {
  const getStatusColor = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-400';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden border bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg text-gray-900">{evaluation.criterion}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{evaluation.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="w-full bg-gray-100 rounded-full h-2.5 mr-2">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${getStatusColor(evaluation.status)}`}
              style={{ width: `${evaluation.score}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {evaluation.score}%
          </span>
        </div>
        <p className="text-sm text-gray-600">{evaluation.assessment}</p>
      </div>
    </Card>
  );
}