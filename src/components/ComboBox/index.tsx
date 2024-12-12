import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@lib/utils';
import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
export interface ComboBoxValueProps {
  label: string;
  value: string;
}
export interface ComboBoxProps {
  data: ComboBoxValueProps[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<ComboBoxValueProps | null>>;
  classname?: string;
}
export const ComboBox = ({ data, value, setValue, classname }: ComboBoxProps) => {
  const [open, setOpen] = React.useState(true);
  console.log(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='link'
          role='combobox'
          aria-expanded={open}
          className={'max-w-[200px] w-full justify-between ' + classname}
        >
          {value ? data.find((item) => item.value === value)?.label : 'Select item...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[200px] p-0 w-full z-[99999999999999]'>
        <Command>
          <CommandInput placeholder='Search item...' />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    console.log(currentValue === value ? data[0] : item);
                    setValue(currentValue === value ? data[0] : item);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
