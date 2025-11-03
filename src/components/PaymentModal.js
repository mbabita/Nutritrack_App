import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';

const PaymentModal = ({ isOpen, onClose, planName, planPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const generateUPIQR = () => {
    const amount = planPrice.replace('₹', '').replace('/month', '');
    const upiString = `upi://pay?pa=${upiId}&pn=NutriTrack&am=${amount}&cu=INR&tn=Subscription%20Payment`;
    return upiString;
  };

  const handlePayment = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      alert('Please fill in all user details');
      return;
    }
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    // Validate UPI ID for Phone Pay and Google Pay
    if ((selectedMethod === 'phonepay' || selectedMethod === 'googlepay') && !upiId.trim()) {
      alert('Please enter your UPI ID');
      return;
    }

    // Validate credit card details
    if (selectedMethod === 'creditcard') {
      if (!cardDetails.number.trim() || !cardDetails.expiry.trim() || !cardDetails.cvv.trim() || !cardDetails.name.trim()) {
        alert('Please fill in all credit card details');
        return;
      }
    }

    // For UPI methods, show QR code instead of processing immediately
    if (selectedMethod === 'phonepay' || selectedMethod === 'googlepay') {
      setShowQR(true);
      return;
    }

    setIsProcessing(true);
    setPaymentResult(null);

    // Simulate payment processing
    setTimeout(() => {
      const random = Math.random();
      let result;
      if (random < 0.5) result = 'success'; // 50% success
      else if (random < 0.75) result = 'technical'; // 25% technical issue
      else result = 'failed'; // 25% failed
      setPaymentResult(result);
      setIsProcessing(false);
    }, 2000);
  };

  const resetModal = () => {
    setSelectedMethod('');
    setIsProcessing(false);
    setPaymentResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <motion.div
        style={styles.modal}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h2>Complete Your Payment</h2>
        <p>Plan: {planName} - {planPrice}</p>

        {!paymentResult && !showQR && (
          <>
            <div style={styles.userDetails}>
              <h3>User Details</h3>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                  style={styles.input}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                  style={styles.input}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.paymentMethods}>
              <h3>Select Payment Method</h3>
              <div style={styles.methodOptions}>
                <label style={styles.methodOption}>
                  <input
                    type="radio"
                    value="phonepay"
                    checked={selectedMethod === 'phonepay'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                  <span>Phone Pay</span>
                </label>
                {selectedMethod === 'phonepay' && (
                  <div style={styles.paymentDetails}>
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g., user@phonepe)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </div>
                )}
                <label style={styles.methodOption}>
                  <input
                    type="radio"
                    value="googlepay"
                    checked={selectedMethod === 'googlepay'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                  <span>Google Pay</span>
                </label>
                {selectedMethod === 'googlepay' && (
                  <div style={styles.paymentDetails}>
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g., user@okhdfcbank)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </div>
                )}
                <label style={styles.methodOption}>
                  <input
                    type="radio"
                    value="creditcard"
                    checked={selectedMethod === 'creditcard'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                  <span>Credit Card</span>
                </label>
                {selectedMethod === 'creditcard' && (
                  <div style={styles.paymentDetails}>
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      style={styles.input}
                      required
                    />
                    <div style={styles.cardRow}>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        style={{...styles.input, flex: 1}}
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        style={{...styles.input, flex: 1}}
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      style={styles.input}
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            <div style={styles.buttons}>
              <button style={styles.cancelButton} onClick={onClose} disabled={isProcessing}>
                Cancel
              </button>
              <button
                style={styles.payButton}
                onClick={handlePayment}
                disabled={isProcessing || !selectedMethod}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </>
        )}

        {showQR && (
          <div style={styles.qrSection}>
            <h3>Scan QR Code to Pay</h3>
            <p>Scan this QR code with your {selectedMethod === 'phonepay' ? 'PhonePe' : 'Google Pay'} app to complete the payment.</p>
            <div style={styles.qrContainer}>
              <QRCodeCanvas value={generateUPIQR()} size={200} />
            </div>
            <p style={styles.qrNote}>Amount: {planPrice}</p>
            <div style={styles.buttons}>
              <button style={styles.cancelButton} onClick={() => setShowQR(false)}>
                Back
              </button>
              <button
                style={styles.payButton}
                onClick={() => {
                  setPaymentResult('success');
                  setShowQR(false);
                }}
              >
                Payment Completed
              </button>
            </div>
          </div>
        )}

        {paymentResult === 'success' && (
          <div style={styles.result}>
            <h3 style={{ color: 'green' }}>Payment Successful!</h3>
            <p>Thank you for subscribing to {planName}. Your account will be activated shortly.</p>
            <button style={styles.closeButton} onClick={resetModal}>Close</button>
          </div>
        )}

        {paymentResult === 'failed' && (
          <div style={styles.result}>
            <h3 style={{ color: 'red' }}>Payment Failed</h3>
            <p>There was an issue processing your payment. Please try again or contact support.</p>
            <button style={styles.retryButton} onClick={() => setPaymentResult(null)}>Try Again</button>
            <button style={styles.closeButton} onClick={resetModal}>Close</button>
          </div>
        )}

        {paymentResult === 'technical' && (
          <div style={styles.result}>
            <h3 style={{ color: 'orange' }}>Technical Issue</h3>
            <p>We're experiencing technical difficulties. Please try again later or contact support.</p>
            <button style={styles.retryButton} onClick={() => setPaymentResult(null)}>Try Again</button>
            <button style={styles.closeButton} onClick={resetModal}>Close</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  userDetails: {
    margin: '20px 0',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  paymentMethods: {
    margin: '20px 0',
  },
  methodOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  methodOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  payButton: {
    padding: '10px 20px',
    backgroundColor: '#387c53',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  result: {
    margin: '20px 0',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#387c53',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '10px 5px',
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '10px 5px',
  },
  paymentDetails: {
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  cardRow: {
    display: 'flex',
    gap: '10px',
  },
  qrSection: {
    margin: '20px 0',
  },
  qrContainer: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  qrNote: {
    fontSize: '14px',
    color: '#666',
    margin: '10px 0',
  },
};

export default PaymentModal;
