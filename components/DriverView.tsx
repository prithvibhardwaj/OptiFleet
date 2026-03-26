import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Navigation,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Map,
} from 'lucide-react';
import { toast } from 'sonner';
import { SidebarTrigger } from './ui/sidebar';

const driverTasks = [
  {
    id: 1,
    customer: 'Ace Pest Control HQ',
    address: '123 Clementi Ave 3, #05-12, Singapore 129588',
    contact: '+65 9123 4567',
    eta: '09:15 AM',
    status: 'completed',
    notes: 'Equipment delivery - signed by Mr. Tan at reception',
    completedAt: '09:10 AM',
  },
  {
    id: 2,
    customer: 'SwiftClean Solutions',
    address: '88 Commonwealth Crescent, #01-08, Singapore 149520',
    contact: '+65 9871 2345',
    eta: '10:05 AM',
    status: 'completed',
    notes: 'Cleaning supplies pickup - 9kg, collect signed DO',
    completedAt: '09:58 AM',
  },
  {
    id: 3,
    customer: 'Clean Pro Services',
    address: '456 Ang Mo Kio St 21, Block 456, Singapore 560456',
    contact: '+65 9234 5678',
    eta: '11:10 AM',
    status: 'in-progress',
    notes: 'Laundry chemicals delivery - 8kg. Ask for Ms. Rachel at loading bay.',
    distance: '3.1 km',
  },
  {
    id: 4,
    customer: 'Fresh Laundry Co',
    address: '789 Bedok North Ave 1, #02-34, Singapore 460789',
    contact: '+65 9345 6789',
    eta: '12:25 PM',
    status: 'pending',
    notes: 'Bulk laundry bags pickup - 15kg. Call ahead 10 min before arrival.',
    distance: '6.4 km',
  },
  {
    id: 5,
    customer: 'BuildMaster Supplies',
    address: '234 Tampines St 21, Singapore 520234',
    contact: '+65 9456 7890',
    eta: '13:40 PM',
    status: 'pending',
    notes: 'Heavy construction materials - use loading ramp at back. Handle with care.',
    distance: '9.2 km',
  },
];

export default function DriverView() {
  const [tasks, setTasks] = useState(driverTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(2); // Currently on task 3

  const markAsCompleted = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed', completedAt: new Date().toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' }) }
        : task
    ));
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-10 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <SidebarTrigger className="text-white" />
            <div className="flex-1">
              <h1 className="text-xl">Driver Dashboard</h1>
              <p className="text-sm text-blue-100">John Lim • Vehicle V001</p>
            </div>
            <Button variant="secondary" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>

          {/* Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Today's Progress</span>
              <span className="text-sm">{completedTasks} of {tasks.length} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 max-w-2xl mx-auto">
        {/* Current Task - Highlighted */}
        {tasks.map((task, index) => {
          const isCurrent = index === currentTaskIndex && task.status === 'in-progress';
          const isCompleted = task.status === 'completed';
          const isPending = task.status === 'pending';

          if (isCompleted && index !== currentTaskIndex - 1) {
            return null; // Hide old completed tasks
          }

          return (
            <Card 
              key={task.id} 
              className={`${
                isCurrent 
                  ? 'border-2 border-blue-500 shadow-lg' 
                  : isCompleted 
                  ? 'opacity-60' 
                  : ''
              }`}
            >
              <CardContent className="p-6">
                {/* Task Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted 
                        ? 'bg-green-500' 
                        : isCurrent 
                        ? 'bg-blue-500 animate-pulse' 
                        : 'bg-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white text-sm">{task.id}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="mb-1">{task.customer}</h3>
                      {isCurrent && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Current Stop
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Completed at {task.completedAt}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm">{task.address}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">ETA</p>
                      <p className="text-sm">{task.eta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contact</p>
                      <p className="text-sm">{task.contact}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {task.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-amber-700 mb-1">Important Notes</p>
                        <p className="text-sm text-amber-900">{task.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {isCurrent && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(task.address)}`, '_blank')}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Start Navigation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12"
                      onClick={() => markAsCompleted(task.id)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark Completed
                    </Button>
                  </div>
                )}

                {isPending && task.distance && (
                  <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                    <span>Distance: {task.distance}</span>
                    <span>Next in queue</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Map Preview Card */}
        <Card>
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg h-48 flex items-center justify-center border border-border">
              <div className="text-center">
                <Map className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="mb-1">Route Overview</h4>
                <p className="text-sm text-muted-foreground">Tap to view full route map</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-14" onClick={() => {
            toast.success('Recalculating route based on current traffic...');
            setTimeout(() => toast.success('Route updated — saved 4 min'), 1500);
          }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Recalculate Route
          </Button>
          <Button variant="outline" className="h-14" onClick={() => toast.info('Issue reported to dispatch team')}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Issue
          </Button>
        </div>

        {/* Footer Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-center text-blue-900">
              💡 Route automatically updates when traffic conditions change
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
