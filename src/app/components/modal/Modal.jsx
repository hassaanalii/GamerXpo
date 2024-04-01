import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
        <p className="text-lg mb-4">Are you sure you want to remove this employee?</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">Confirm</button>
          <button onClick={onClose} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;