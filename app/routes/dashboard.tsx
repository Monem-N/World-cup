import { PageLayout } from '../components/layout/PageLayout';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const Dashboard = () => {
  return (
    <PageLayout showBreadcrumbs={false}>
      <DashboardLayout />
    </PageLayout>
  );
};

export default Dashboard;
