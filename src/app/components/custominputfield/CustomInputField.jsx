"use client"
import React, { useState } from 'react';

const CustomInputField = ({ type, id, value, onChange, placeholder, className }) => (
    <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
    />
);
export default CustomInputField