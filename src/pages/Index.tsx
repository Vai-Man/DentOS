import Header from '@/components/Header';
import ToothMap from '@/components/ToothMap';
import PatientPanel from '@/components/PatientPanel';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import CompliancePanel from '@/components/CompliancePanel';
import ReportView from '@/components/ReportView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 lg:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Patient + Tooth Map */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PatientPanel />
            <ToothMap />
          </motion.div>

          {/* Center Column: Workflow */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Tabs defaultValue="workflow" className="w-full">
              <TabsList className="w-full bg-muted/50 mb-3">
                <TabsTrigger value="workflow" className="flex-1 text-xs">Workflow</TabsTrigger>
                <TabsTrigger value="report" className="flex-1 text-xs">Report</TabsTrigger>
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
    </div>
  );
};

export default Index;
