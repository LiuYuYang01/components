import React, { useState, useRef, useEffect } from 'react';
import Calendar from './Calendar';
import { format } from 'date-fns';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '请选择日期',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理日期选择
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  // 点击外部关闭日历
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <input
        type="text"
        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      />
      
      {isOpen && (
        <div className="absolute z-50 mt-2">
          <Calendar
            value={selectedDate || undefined}
            onChange={handleDateSelect}
            isQuickSelect={true}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker; 