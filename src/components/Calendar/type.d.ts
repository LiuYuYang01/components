export interface CalendarProps {
  value?: Date;                // 当前选中的日期
  onChange?: (date: Date) => void;  // 日期变化时的回调函数
  isQuickSelect?: boolean;  // 是否显示快速选择按钮
  className?: string;          // 自定义样式类名
}

export interface ManyCalendarProps {
  value?: Date[];
  onChange?: (dates: Date[]) => void;
  className?: string;
}