import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InterviewQuestion } from '../types'
import { 
  Star, RefreshCcw, ThumbsUp, MessageSquare, 
  Brain, Target, BarChart, Award, Clock, Mic, Download, Share2
} from 'lucide-react'

interface InterviewReviewProps {
  answers: string[]
  questions: InterviewQuestion[]
  onStartNew: () => void
}

export function InterviewReview({ answers, questions, onStartNew }: InterviewReviewProps) {
  return (
    <div className="flex items-start justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-6xl animate-fade-in-up">
        <Card className="relative border border-primary/10 shadow-2xl backdrop-blur-sm bg-background/95">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="relative p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2 pb-2 border-b border-primary/10">
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-6 h-6 text-primary animate-pulse" />
                <h1 className="text-2xl font-bold text-primary">Interview Performance Analysis</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive AI-powered analysis of your interview responses
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Brain, label: 'Questions', value: `${questions.length} Total` },
                { icon: Clock, label: 'Duration', value: '15:30 mins' },
                { icon: Target, label: 'Completion', value: '100%' },
                { icon: Star, label: 'Overall Score', value: '8.5/10' },
              ].map((stat, index) => (
                <Card key={index} className="p-3 border border-primary/10 bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-sm font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Performance Analysis */}
              <Card className="p-4 border border-primary/10 bg-muted/50">
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Detailed Analysis</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-green-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-semibold">Key Strengths</span>
                    </div>
                    <ul className="space-y-1 pl-6 text-sm">
                      <li className="text-muted-foreground">Strong STAR method implementation</li>
                      <li className="text-muted-foreground">Excellent communication clarity</li>
                      <li className="text-muted-foreground">Effective use of technical terminology</li>
                      <li className="text-muted-foreground">Engaging presentation style</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-amber-500">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-semibold">Areas for Growth</span>
                    </div>
                    <ul className="space-y-1 pl-6 text-sm">
                      <li className="text-muted-foreground">Include more quantifiable achievements</li>
                      <li className="text-muted-foreground">Expand on problem-solving approaches</li>
                      <li className="text-muted-foreground">Enhance leadership examples</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Skill Ratings */}
              <Card className="p-4 border border-primary/10 bg-muted/50">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Skill Assessment</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { skill: 'Communication', score: 90 },
                    { skill: 'Technical Knowledge', score: 85 },
                    { skill: 'Problem Solving', score: 88 },
                    { skill: 'Leadership', score: 82 },
                    { skill: 'Cultural Fit', score: 95 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span className="font-semibold">{item.score}%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Response Recordings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Response Recordings</h3>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-4 h-4 mr-1" /> Download All
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Share2 className="w-4 h-4 mr-1" /> Share
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {answers.map((audioUrl, index) => (
                  <Card key={index} className="p-3 border border-primary/10 bg-muted/50">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold flex items-center space-x-2">
                            <span>Question {index + 1}</span>
                            <span className="text-xs px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                              {index === 0 ? 'Introduction' : index === answers.length - 1 ? 'Closing' : 'Technical'}
                            </span>
                          </h4>
                          <p className="text-xs text-muted-foreground">{questions[index].question}</p>
                        </div>
                      </div>
                      <audio 
                        src={audioUrl} 
                        controls 
                        className="w-full h-8"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button
                onClick={onStartNew}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Start New Interview
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 