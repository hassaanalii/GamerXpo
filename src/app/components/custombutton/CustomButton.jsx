"use client"
import React, { useState } from 'react';
const CustomButton = ({ children, onClick, className, type = 'button' }) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);

export default CustomButton