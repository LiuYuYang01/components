import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { ManyCalendarProps } from '../type';

export default ({ value = [], onChange, className }: ManyCalendarProps) => {
  // 状态管理
  const [currentDate, setCurrentDate] = useState(new Date());  // 当前显示的月份
  const [selectedDates, setSelectedDates] = useState<Date[]>(value);  // 选中的日期数组
  const [showYearSelect, setShowYearSelect] = useState(false);  // 是否显示年份选择器
  const yearSelectRef = useRef<HTMLDivElement>(null); // 年份选择框

  // 常量定义
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];  // 星期显示
  // 生成年份范围（当前年份前后10年）
  const years = Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i);

  // 获取指定月份的天数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 获取指定月份的第一天是星期几
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 判断是否是今天
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // 判断日期是否被选中
  const isSelected = (date: Date) => {
    return selectedDates.some(selectedDate =>
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  // 处理日期点击事件
  const handleDateClick = (date: Date) => {
    let newSelectedDates: Date[];

    if (isSelected(date)) {
      // 如果日期已经被选中，则移除它
      newSelectedDates = selectedDates.filter(selectedDate =>
        !(selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear())
      );
    } else {
      // 如果日期未被选中，则添加它
      newSelectedDates = [...selectedDates, date];
    }

    setSelectedDates(newSelectedDates);
    onChange?.(newSelectedDates);
  };

  // 切换月份（上一个月/下一个月）
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1)));
  };

  // 处理年份选择
  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearSelect(false);
  };

  // 添加点击外部关闭选择器的效果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearSelectRef.current && !yearSelectRef.current.contains(event.target as Node)) {
        setShowYearSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 渲染日历日期
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));

    const days = [];

    // 渲染上个月的日期
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPrevMonth - i);
      days.push(
        <button
          key={`prev-${i}`}
          onClick={() => handleDateClick(date)}
          className={`
            w-full aspect-square flex items-center justify-center text-sm rounded-full
            ${isSelected(date) ? 'bg-blue-400 text-white hover:bg-blue-500' : 'text-gray-300 hover:bg-gray-100'}
          `}
        >
          {daysInPrevMonth - i}
        </button>
      );
    }

    // 渲染当前月份的日期
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isCurrentDay = isToday(date);
      const isSelectedDay = isSelected(date);

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(date)}
          className={`
            w-full aspect-square flex items-center justify-center text-sm rounded-full
            ${isSelectedDay ? 'bg-blue-400 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/50' : 'hover:bg-gray-100'}
            ${isCurrentDay && !isSelectedDay ? 'text-blue-400 font-semibold' : 'text-gray-700'}
          `}
        >
          {i}
        </button>
      );
    }

    // 渲染下个月的日期
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      days.push(
        <button
          key={`next-${i}`}
          onClick={() => handleDateClick(date)}
          className={`
            w-full aspect-square flex items-center justify-center text-sm rounded-full
            ${isSelected(date) ? 'bg-blue-400 text-white hover:bg-blue-500' : 'text-gray-300 hover:bg-gray-100'}
          `}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`w-[300px] p-4 bg-white rounded-xl shadow-lg ${className}`}>
      {/* 月份导航栏 */}
      <div className="flex justify-between items-center mb-4 mx-8">
        <div className='group flex justify-center items-center hover:bg-gray-100 rounded-full p-1 cursor-pointer' onClick={() => navigateMonth('prev')}>
          <GoChevronLeft className='text-gray-300 text-2xl group-hover:text-gray-500' />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowYearSelect(!showYearSelect)}
            className="text-lg font-semibold text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
          >
            {currentDate.getFullYear()} - {currentDate.getMonth() + 1}
          </button>

          <AnimatePresence>
            {showYearSelect && (
              <motion.div
                ref={yearSelectRef}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 p-2 bg-white shadow-lg rounded-lg border border-gray-200 w-24 max-h-48 overflow-y-auto z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`
                      w-full px-2 py-1 my-0.5 text-left rounded cursor-pointer
                      ${year === currentDate.getFullYear() ? 'text-blue-500 bg-[#eef6ff]' : 'hover:text-blue-500 hover:bg-[#eef6ff]'}
                    `}
                  >
                    {year}年
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='group flex justify-center items-center hover:bg-gray-100 rounded-full p-1 cursor-pointer' onClick={() => navigateMonth('next')}>
          <GoChevronRight className='text-gray-300 text-2xl group-hover:text-gray-500' />
        </div>
      </div>

      {/* 星期表头 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};
