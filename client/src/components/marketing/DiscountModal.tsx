import { useState, useEffect } from 'react';
import './DiscountModal.css';

export function DiscountModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the modal
    if (localStorage.getItem('popup-dismissed') !== '1') {
      // Show modal after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const hideModal = () => {
    setIsVisible(false);
    localStorage.setItem('popup-dismissed', '1');
  };

  const handleClaimClick = () => {
    setShowEmailForm(true);
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      // TODO: Send the email to your server/API
      // Example API call:
      // fetch('/api/discount-signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      setSubmitted(true);
    } else {
      alert('Please enter a valid email address');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="discount-modal-overlay">
      <div className="discount-modal">
        <div className="discount-modal-close" onClick={hideModal}>×</div>
        
        <div className="discount-modal-content">
          {submitted ? (
            <div className="thank-you-content">
              <div className="brand">THANK YOU!</div>
              <p>Your discount code has been sent to:</p>
              <p className="email-display">{email}</p>
              <button className="claim-button" onClick={hideModal}>CLOSE</button>
            </div>
          ) : !showEmailForm ? (
            <div className="offer-content">
              <div className="brand">HARDYS WASH N' WAX</div>
              <div className="discount">20% OFF</div>
              <div className="subtext">YOUR FIRST PREMIUM DETAIL</div>
              
              <div className="image-container">
                <img 
                  src="/attached_assets/express.jpg" 
                  alt="Premium car detailing" 
                  className="modal-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://www.freepnglogos.com/uploads/car-png/car-png-large-images-40.png";
                  }}
                />
              </div>
              
              <button className="claim-button" onClick={handleClaimClick}>
                CLAIM 20% OFF
              </button>
              
              <a href="#" className="decline" onClick={(e) => {
                e.preventDefault();
                hideModal();
              }}>
                DECLINE OFFER
              </a>
            </div>
          ) : (
            <div className="email-form">
              <div className="brand">ALMOST YOURS</div>
              <p>Enter your email to receive your discount code</p>
              
              <form onSubmit={handleSubmitEmail}>
                <input
                  type="email"
                  className="email-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <button type="submit" className="claim-button">
                  SEND ME THE CODE
                </button>
              </form>
              
              <a href="#" className="decline" onClick={(e) => {
                e.preventDefault();
                hideModal();
              }}>
                No thanks, I changed my mind
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscountModal;