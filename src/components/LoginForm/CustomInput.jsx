import React from 'react';

export default function CustomInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  icon: Icon,
  rightElement
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold tracking-wider text-[#73687c] uppercase mb-2 ml-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#b1a7b8]">
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          required
          className={`w-full ${Icon ? 'pl-11' : 'pl-5'} ${
            rightElement ? 'pr-12' : 'pr-5'
          } py-3.5 bg-[#f8f5f1] border-0 rounded-2xl focus:ring-2 focus:ring-[#e3b5be] focus:bg-white text-[#4a4252] placeholder-[#c5bcce] outline-none transition-all duration-200 text-sm`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}