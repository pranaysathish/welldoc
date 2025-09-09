import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { HealthDashboard } from './components/HealthDashboard';
import { AnalysisPage } from './components/AnalysisPage';
import { HospitalsPage } from './components/HospitalsPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { DataInputPage } from './components/DataInputPage';
import { ManualLogModal } from './components/ManualLogModal';
import { AICoachModal } from './components/AICoachModal';
import { NotificationsModal } from './components/NotificationsModal';
import { MenuModal } from './components/MenuModal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedDataInput, setHasCompletedDataInput] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isManualLogOpen, setIsManualLogOpen] = useState(false);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleDataInputComplete = () => {
    setHasCompletedDataInput(true);
  };

  const handleSkipDataInput = () => {
    setHasCompletedDataInput(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HealthDashboard />;
      case 'analysis':
        return <AnalysisPage />;
      case 'hospitals':
        return <HospitalsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HealthDashboard />;
    }
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show data input page if logged in but hasn't completed data input
  if (isLoggedIn && !hasCompletedDataInput) {
    return (
      <DataInputPage 
        onComplete={handleDataInputComplete}
        onSkip={handleSkipDataInput}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Main Content */}
      <div className="px-4 pt-2">
        <div className="max-w-md mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButtons 
        onOpenManualLog={() => setIsManualLogOpen(true)}
        onOpenAICoach={() => setIsAICoachOpen(true)}
      />

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Modals */}
      <ManualLogModal 
        isOpen={isManualLogOpen}
        onClose={() => setIsManualLogOpen(false)}
      />

      <AICoachModal 
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
      />

      <NotificationsModal 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <MenuModal 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}