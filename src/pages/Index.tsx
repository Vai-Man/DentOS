import Header from '@/components/Header';
import ToothMap from '@/components/ToothMap';
import PatientPanel from '@/components/PatientPanel';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import CompliancePanel from '@/components/CompliancePanel';
import ReportView from '@/components/ReportView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [expandedChart, setExpandedChart] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 min-h-[calc(100vh-56px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Patient + Tooth Map */}
          <motion.div
            className="lg:col-span-3 space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PatientPanel />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">Dental Chart</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs gap-1.5 h-8"
                  onClick={() => setExpandedChart(true)}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <ToothMap />
            </div>
          </motion.div>

          {/* Center Column: Workflow */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Tabs defaultValue="workflow" className="w-full">
              <TabsList className="w-full bg-muted/50 mb-4">
                <TabsTrigger value="workflow" className="flex-1 text-sm">Workflow</TabsTrigger>
                <TabsTrigger value="report" className="flex-1 text-sm">Report</TabsTrigger>
              </TabsList>
              <TabsContent value="workflow">
                <WorkflowBuilder />
              </TabsContent>
              <TabsContent value="report">
                <ReportView />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Right Column: Compliance */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CompliancePanel />
          </motion.div>
        </div>
      </main>

      {/* Expanded Dental Chart Modal */}
      <Dialog open={expandedChart} onOpenChange={setExpandedChart}>
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>Dental Chart — Select Tooth for Extraction</DialogTitle>
          </DialogHeader>
          <ToothMap expanded />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
