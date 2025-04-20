import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Layout, Search, Eye, BarChart, CheckCircle, User, Edit, Phone, Clipboard, Image, Globe, TrendingUp, Heart, Scissors, List, Key, Flag, Link } from 'lucide-react';

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

const iconMap: Record<string, JSX.Element> = {
  'Layout & Searchability': <Layout className="h-6 w-6 text-gray-700" />,
  'ATS Readability': <Search className="h-6 w-6 text-gray-700" />,
  'Impact & Effectiveness': <Eye className="h-6 w-6 text-gray-700" />,
  'Quantifiable Achievements': <BarChart className="h-6 w-6 text-gray-700" />,
  'Readability & Clarity': <CheckCircle className="h-6 w-6 text-gray-700" />,
  'Personal Branding': <User className="h-6 w-6 text-gray-700" />,
  'Grammar & Spelling': <Edit className="h-6 w-6 text-gray-700" />,
  'Contact Information': <Phone className="h-6 w-6 text-gray-700" />,
  'Section Completeness': <Clipboard className="h-6 w-6 text-gray-700" />,
  // eslint-disable-next-line jsx-a11y/alt-text
  'Visual Appeal': <Image className="h-6 w-6 text-gray-700" />,
  'Cultural Fit': <Globe className="h-6 w-6 text-gray-700" />,
  'Career Progression': <TrendingUp className="h-6 w-6 text-gray-700" />,
  'Emotional & Persuasive Appeal': <Heart className="h-6 w-6 text-gray-700" />,
  'Conciseness': <Scissors className="h-6 w-6 text-gray-700" />,
  'Bullet Point Clarity': <List className="h-6 w-6 text-gray-700" />,
  'Industry-Specific Keywords': <Key className="h-6 w-6 text-gray-700" />,
  'Call-to-Action': <Flag className="h-6 w-6 text-gray-700" />,
  'Overall Cohesion': <Link className="h-6 w-6 text-gray-700" />
};

export function DetailCard({ evaluation }: DetailCardProps) {
  const statusColors = {
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
      <CardHeader className="space-y-1 p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {iconMap[evaluation.criterion]}
            <h3 className="font-semibold text-lg text-gray-900">{evaluation.criterion}</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[evaluation.status]}`}>
            {evaluation.score}%
          </span>
        </div>
        <p className="text-sm text-gray-600">{evaluation.description}</p>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">{evaluation.assessment}</p>
        </div>
      </CardContent>
    </Card>
  );
}