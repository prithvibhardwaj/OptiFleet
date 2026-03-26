import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Database, Loader2, CheckCircle2 } from 'lucide-react';
import { seedInitialData } from '../utils/seedData';
import { ordersApi } from '../utils/api';

export default function DataSeeder() {
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    checkForData();
  }, []);

  const checkForData = async () => {
    try {
      const response = await ordersApi.getAll();
      setHasData(response.data && response.data.length > 0);
    } catch (error) {
      console.error('Error checking for data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setSeeding(true);
    await seedInitialData();
    setSeeding(false);
    setHasData(true);
  };

  if (loading) {
    return null;
  }

  if (hasData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2">Welcome to OptiFleet!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              It looks like this is your first time. Would you like to load sample data to explore the platform?
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleSeedData}
                disabled={seeding}
              >
                {seeding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Sample Data...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Load Sample Data
                  </>
                )}
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => setHasData(true)}
              >
                Start Fresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
