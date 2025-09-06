import React, { useState } from 'react';

function QtyBox(props) {
  const [qty, setQty] = useState(1);

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      props.handleSelectQty(qty - 1);
    }
  };

  const handleIncrement = () => {
    setQty(qty + 1);
    props.handleSelectQty(qty + 1);
  };

  return (
    <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-1 w-fit">
      <button
        onClick={handleDecrement}
        className="text-xl font-bold px-2 hover:text-[#ff5252]">
        −
      </button>
      <span className="min-w-[20px] text-center">{qty}</span>
      <button
        onClick={handleIncrement}
        className="text-xl font-bold px-2 hover:text-[#ff5252]">
        +
      </button>
    </div>
  );
}

export default QtyBox;
