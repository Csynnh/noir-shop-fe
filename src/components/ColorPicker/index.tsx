import { cn } from '@lib/utils';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Paintbrush } from 'lucide-react';
import { useMemo } from 'react';

export function ColorPicker({
  background,
  setBackground,
  className,
  name,
}: {
  background: string;
  setBackground: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
    '#800000',
    '#808000',
    '#008000',
    '#800080',
    '#008080',
    '#000080',
    '#c0c0c0',
    '#808080',
    '#999999',
    '#333333',
    '#666666',
    '#999999',
    '#cccccc',
    '#ff6666',
    '#66ff66',
    '#6666ff',
    '#ffcc66',
    '#66ffcc',
    '#cc66ff',
    '#ff6666',
    '#66ff66',
    '#6666ff',
    '#ffcc66',
    '#66ffcc',
    '#cc66ff',
    '#ff9999',
    '#99ff99',
    '#9999ff',
    '#ffcc99',
    '#99ffcc',
    '#cc99ff',
    '#ff9999',
    '#99ff99',
    '#9999ff',
    '#ffcc99',
    '#99ffcc',
    '#cc99ff',
    '#ffcccc',
    '#ccffcc',
    '#ccccff',
    '#ffccff',
    '#ccffff',
    '#ffffcc',
    '#ffcccc',
    '#ccffcc',
    '#ccccff',
    '#ffccff',
    '#ccffff',
    '#ffffcc',
    '#ff3333',
    '#33ff33',
    '#3333ff',
    '#ff9933',
    '#33ff99',
    '#9933ff',
    '#ff3333',
    '#33ff33',
    '#3333ff',
    '#ff9933',
    '#33ff99',
    '#9933ff',
    '#ff6666',
    '#66ff66',
    '#6666ff',
    '#ffcc66',
    '#66ffcc',
    '#cc66ff',
    '#ff6666',
    '#66ff66',
    '#6666ff',
    '#ffcc66',
    '#66ffcc',
    '#cc66ff',
    '#ff9999',
    '#99ff99',
    '#9999ff',
    '#ffcc99',
    '#99ffcc',
    '#cc99ff',
    '#ff9999',
    '#99ff99',
    '#9999ff',
    '#ffcc99',
    '#99ffcc',
    '#cc99ff',
  ];

  const defaultTab = useMemo(() => {
    if (background.includes('url')) return 'image';
    if (background.includes('gradient')) return 'gradient';
    return 'solid';
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'max-w-[220px] w-full justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            'border-solid border-0 shadow-none border-b border-b-[var(--line-color)]',
            className,
          )}
        >
          <div className='w-full flex items-center gap-2'>
            {background ? (
              <div
                className='h-4 w-4 rounded !bg-center !bg-cover transition-all'
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className='h-4 w-4' />
            )}
            <div className='truncate flex-1'>{background ? background : 'Pick a color'}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64 z-[999999999999] rounded-[10px]'>
        <Tabs defaultValue={defaultTab} className='w-full'>
          <TabsList className='w-full mb-4 hidden'>
            <TabsTrigger className='flex-1' value='solid'>
              Solid
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='solid'
            className='flex flex-wrap gap-1 mt-0 max-h-[160px] overflow-y-scroll scroll-smooth'
          >
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className='rounded-[6px] h-6 w-6 cursor-pointer active:scale-105 hover:scale-105'
                onClick={() => setBackground({ target: { value: s, name: name } } as any)}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Input
          id='custom'
          name={name}
          value={background}
          className='col-span-2 h-8 mt-4'
          onChange={(e) => setBackground(e)}
        />
      </PopoverContent>
    </Popover>
  );
}
