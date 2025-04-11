import { CalendarProps, ManyCalendarProps } from './type';
import CalendarComponent from './components/default';
import ManyCalendarComponent from './components/many';

export const Calendar = (props: CalendarProps) => <CalendarComponent {...props} />;
export const ManyCalendar = (props: ManyCalendarProps) => <ManyCalendarComponent {...props} />;