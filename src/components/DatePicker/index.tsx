'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import dayjs from 'dayjs';
import { SelectSingleEventHandler } from 'react-day-picker';
interface DatePickerProp {
  className?: string;
}
const DatePicker = ({ className }: DatePickerProp) => {
  const [date, setDate] = React.useState<Date>(dayjs().toDate());
  const handleDateChange: SelectSingleEventHandler = (day: Date | undefined) => {
    if (day) {
      setDate(day);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 z-[99999999]' align='start'>
        <Calendar mode='single' selected={date} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
