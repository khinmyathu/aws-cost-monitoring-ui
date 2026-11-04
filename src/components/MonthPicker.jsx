import React, { useState, useRef, useEffect } from 'react';
import './MonthPicker.css';

export default function MonthPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const [currentYear, currentMonth] = (value || '2026-10').split('-').map(Number);
  const [viewYear, setViewYear] = useState(currentYear);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    setViewYear(currentYear);
    setIsOpen(!isOpen);
  };

  const handleSelectMonth = (m) => {
    const formattedMonth = String(m).padStart(2, '0');
    onChange(`${viewYear}-${formattedMonth}`);
    setIsOpen(false);
  };

  const displayValue = value ? value.replace('-', '/') : '';

  return (
    <div ref={containerRef} className="month-picker-container">
      <div onClick={handleOpen} className="month-picker-trigger">
        <span>{displayValue}</span>
        <span className="month-picker-icon">📅</span>
      </div>

      {isOpen && (
        <div className="month-picker-popover">
          <div className="month-picker-header">
            <button
              type="button"
              onClick={() => setViewYear(prev => prev - 1)}
              className="month-picker-nav-btn"
            >
              ◀
            </button>
            <span className="month-picker-year-label">
              {viewYear}
            </span>
            <button
              type="button"
              onClick={() => setViewYear(prev => prev + 1)}
              className="month-picker-nav-btn"
            >
              ▶
            </button>
          </div>

          <div className="month-picker-grid">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
              const isSelected = viewYear === currentYear && m === currentMonth;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleSelectMonth(m)}
                  className={`month-picker-cell ${isSelected ? 'selected' : ''}`}
                >
                  {m}月
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}