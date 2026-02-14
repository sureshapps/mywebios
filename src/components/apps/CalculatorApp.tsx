import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';

export const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const input = (val: string) => {
    if (fresh) {
      setDisplay(val === '.' ? '0.' : val);
      setFresh(false);
    } else {
      if (val === '.' && display.includes('.')) return;
      setDisplay(display + val);
    }
  };

  const operate = (nextOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op) {
      let result = prev;
      if (op === '+') result = prev + current;
      if (op === '-') result = prev - current;
      if (op === '×') result = prev * current;
      if (op === '÷') result = current !== 0 ? prev / current : 0;
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setFresh(true);
  };

  const equals = () => {
    if (prev === null || !op) return;
    operate('=');
    setOp(null);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const toggleSign = () => setDisplay(String(-parseFloat(display)));
  const percent = () => setDisplay(String(parseFloat(display) / 100));

  const Btn = ({ label, wide, accent, dark, onClick }: { label: string; wide?: boolean; accent?: boolean; dark?: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`${wide ? 'col-span-2 text-left pl-7' : ''} h-16 rounded-full text-2xl font-light transition-all active:opacity-70
        ${accent ? 'bg-primary text-primary-foreground' : dark ? 'bg-muted text-foreground' : 'bg-secondary text-secondary-foreground'}`}
    >
      {label}
    </button>
  );

  return (
    <AppLayout title="" bgClass="bg-black" noPadding>
      <div className="flex flex-col h-full justify-end p-4">
        <div className="text-right text-white text-6xl font-thin mb-4 px-2 overflow-hidden">
          {display.length > 9 ? parseFloat(display).toExponential(4) : display}
        </div>
        <div className="grid grid-cols-4 gap-3">
          <Btn label="AC" dark onClick={clear} />
          <Btn label="±" dark onClick={toggleSign} />
          <Btn label="%" dark onClick={percent} />
          <Btn label="÷" accent onClick={() => operate('÷')} />
          <Btn label="7" onClick={() => input('7')} />
          <Btn label="8" onClick={() => input('8')} />
          <Btn label="9" onClick={() => input('9')} />
          <Btn label="×" accent onClick={() => operate('×')} />
          <Btn label="4" onClick={() => input('4')} />
          <Btn label="5" onClick={() => input('5')} />
          <Btn label="6" onClick={() => input('6')} />
          <Btn label="-" accent onClick={() => operate('-')} />
          <Btn label="1" onClick={() => input('1')} />
          <Btn label="2" onClick={() => input('2')} />
          <Btn label="3" onClick={() => input('3')} />
          <Btn label="+" accent onClick={() => operate('+')} />
          <Btn label="0" wide onClick={() => input('0')} />
          <Btn label="." onClick={() => input('.')} />
          <Btn label="=" accent onClick={equals} />
        </div>
      </div>
    </AppLayout>
  );
};
