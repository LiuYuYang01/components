import React, { useState } from 'react';
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

interface CalendarProps {
  value?: Date;                // 当前选中的日期
  onChange?: (date: Date) => void;  // 日期变化时的回调函数
  isQuickSelect?: boolean;  // 是否显示快速选择按钮
  className?: string;          // 自定义样式类名
}

export default ({ value, onChange, className, isQuickSelect = false }: CalendarProps) => {
  // 状态管理
  const [currentDate, setCurrentDate] = useState(value || new Date());  // 当前显示的月份
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || new Date());  // 选中的日期
  const [showYearSelect, setShowYearSelect] = useState(false);  // 是否显示年份选择器

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

    // 判断年月日是否相同
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // 判断是否是选中的日期
  const isSelected = (date: Date) => {
    // 判断年月日是否相同
    return selectedDate?.getDate() === date.getDate() &&
      selectedDate?.getMonth() === date.getMonth() &&
      selectedDate?.getFullYear() === date.getFullYear();
  };

  // 判断快速选择按钮是否应该高亮
  const isQuickSelectActive = (type: 'today' | 'yesterday' | 'week' | 'month' | 'year') => {
    if (!selectedDate) return false;

    const today = new Date();
    const selected = new Date(selectedDate);

    switch (type) {
      case 'today':
        return isToday(selected);
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return selected.getDate() === yesterday.getDate() &&
          selected.getMonth() === yesterday.getMonth() &&
          selected.getFullYear() === yesterday.getFullYear();
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return selected.getDate() === weekAgo.getDate() &&
          selected.getMonth() === weekAgo.getMonth() &&
          selected.getFullYear() === weekAgo.getFullYear();
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return selected.getDate() === monthAgo.getDate() &&
          selected.getMonth() === monthAgo.getMonth() &&
          selected.getFullYear() === monthAgo.getFullYear();
      case 'year':
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        return selected.getDate() === yearAgo.getDate() &&
          selected.getMonth() === yearAgo.getMonth() &&
          selected.getFullYear() === yearAgo.getFullYear();
      default:
        return false;
    }
  };

  // 处理日期点击事件
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
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

  // 处理快速选择日期（今天、昨天、一周前等）
  const handleQuickSelect = (type: 'today' | 'yesterday' | 'week' | 'month' | 'year') => {
    const today = new Date();
    let selectedDate: Date;

    switch (type) {
      case 'today':
        selectedDate = today;
        break;
      case 'yesterday':
        selectedDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'week':
        selectedDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'month':
        selectedDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case 'year':
        selectedDate = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
      default:
        selectedDate = today;
    }

    setSelectedDate(selectedDate);
    setCurrentDate(selectedDate);
    onChange?.(selectedDate);
  };

  // 渲染日历日期
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);  // 当前月份的天数
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);  // 当前月份第一天是星期几
    const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));  // 上个月的天数

    const days = [];

    // 渲染上个月的日期（填充日历开始前的空白）
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPrevMonth - i);

      days.push(
        <button
          key={`prev-${i}`}
          onClick={() => handleDateClick(date)}
          className="w-full aspect-square flex items-center justify-center text-gray-300 hover:bg-gray-100 rounded-full text-sm"
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
            ${isCurrentDay ? 'text-blue-400 font-semibold' : 'text-gray-700'}
          `}
        >
          {i}
        </button>
      );
    }

    // 渲染下个月的日期（填充日历结束后的空白）
    const remainingDays = 42 - days.length;  // 42是6行7列的日历网格总天数
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      days.push(
        <button
          key={`next-${i}`}
          onClick={() => handleDateClick(date)}
          className="w-full aspect-square flex items-center justify-center text-gray-300 hover:bg-gray-100 rounded-full text-sm"
        >
          {i}
        </button>
      );
    }

    return days;
  };

  // 组件渲染
  return (
    <div className={`flex justify-between ${isQuickSelect ? 'w-[410px]' : 'w-[300px]'} p-4 pl-2 bg-white rounded-xl shadow-lg ${className}`}>
      {/* 左侧快捷选择按钮区域 */}
      {
        isQuickSelect && (
          <div className="flex flex-col min-w-[50px] pr-2 border-r border-gray-100 space-y-2">
            <button
              onClick={() => handleQuickSelect('today')}
              className={`px-4 py-1 text-sm rounded-sm cursor-pointer ${isQuickSelectActive('today')
                  ? 'text-blue-500 bg-[#eef6ff]'
                  : 'hover:text-blue-500 hover:bg-[#eef6ff]'
                }`}
            >今天</button>

            <button
              onClick={() => handleQuickSelect('yesterday')}
              className={`px-4 py-1 text-sm rounded-sm cursor-pointer ${isQuickSelectActive('yesterday')
                  ? 'text-blue-500 bg-[#eef6ff]'
                  : 'hover:text-blue-500 hover:bg-[#eef6ff]'
                }`}
            >昨天</button>

            <button
              onClick={() => handleQuickSelect('week')}
              className={`px-4 py-1 text-sm rounded-sm cursor-pointer ${isQuickSelectActive('week')
                  ? 'text-blue-500 bg-[#eef6ff]'
                  : 'hover:text-blue-500 hover:bg-[#eef6ff]'
                }`}
            >一周前</button>

            <button
              onClick={() => handleQuickSelect('month')}
              className={`px-4 py-1 text-sm rounded-sm cursor-pointer ${isQuickSelectActive('month')
                  ? 'text-blue-500 bg-[#eef6ff]'
                  : 'hover:text-blue-500 hover:bg-[#eef6ff]'
                }`}
            >一月前</button>

            <button
              onClick={() => handleQuickSelect('year')}
              className={`px-4 py-1 text-sm rounded-sm cursor-pointer ${isQuickSelectActive('year')
                  ? 'text-blue-500 bg-[#eef6ff]'
                  : 'hover:text-blue-500 hover:bg-[#eef6ff]'
                }`}
            >一年前</button>
          </div>
        )
      }

      {/* 右侧日历主体区域 */}
      <div className={`w-[300px] ${isQuickSelect ? 'pl-4' : ''} `}>
        {/* 月份导航栏 */}
        <div className="flex justify-between items-center mb-4 mx-8">
          {/* 上个月按钮 */}
          <div className='group flex justify-center items-center hover:bg-gray-100 rounded-full p-1 cursor-pointer' onClick={() => navigateMonth('prev')}>
            <GoChevronLeft className='text-gray-300 text-2xl group-hover:text-gray-500' />
          </div>

          {/* 年月显示和选择 */}
          <div className="relative">
            <button
              onClick={() => setShowYearSelect(!showYearSelect)}
              className="text-lg font-semibold text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
            >
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </button>

            {/* 年份选择下拉框 */}
            {showYearSelect && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 p-2 bg-white shadow-lg rounded-lg border border-gray-200 w-32 max-h-48 overflow-y-auto z-10">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`
                    w-full px-2 py-1 text-left rounded
                    ${year === currentDate.getFullYear() ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  `}
                  >
                    {year}年
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 下个月按钮 */}
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
    </div>
  );
};