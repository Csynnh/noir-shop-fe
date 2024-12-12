import { ComboBoxValueProps } from '@components/ComboBox';
import { cn } from '@lib/utils';
import { Button } from '@ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

type SelectonProps = {
  name: string;
  data: ComboBoxValueProps[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  value?: string | number;
};
export const Selection = ({ data, onChange, value, classname, name }: SelectonProps) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='link'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'max-w-[200px] w-full justify-between border-b-[0.5px] border-b-[var(--line-color)] p-0',
            classname,
          )}
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
                    onChange({
                      target: {
                        name: name,
                        value: currentValue === value ? '' : currentValue,
                      },
                    } as any);
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
