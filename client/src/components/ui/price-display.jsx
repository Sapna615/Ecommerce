import React from 'react';

// Price display component for Indian Rupees
const PriceDisplay = ({ price, salePrice, className = "" }) => {
  const formatIndianPrice = (price) => {
    // Convert to number and format as Indian Rupees
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return 'Rs. 0';
    
    // Format with Indian number system (lakhs, crores)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice).replace('INR', 'Rs.');
  };

  const displayPrice = salePrice || price;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="font-bold text-lg">
        {formatIndianPrice(displayPrice)}
      </span>
      {salePrice && parseFloat(salePrice) < parseFloat(price) && (
        <span className="text-sm text-gray-500 line-through">
          {formatIndianPrice(price)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
