import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';

const PaymentPage = () => {
  const location = useLocation();
  const { planName, planPrice } = location.state || {};

  return (
    <div style={{ padding: '20px' }}>
      <PaymentModal
        isOpen={true}
        onClose={() => window.history.back()}
        planName={planName}
        planPrice={planPrice}
      />
    </div>
  );
};

export default PaymentPage;
