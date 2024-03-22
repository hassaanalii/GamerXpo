"use client"
import React, { useState } from 'react';

const CustomInputField = ({ type, id, name, value, onChange, placeholder, className, readOnly }) => (
    <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        readOnly={readOnly}
    />
);
export default CustomInputField