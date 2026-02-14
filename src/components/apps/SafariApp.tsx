import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Plus, Search } from 'lucide-react';

export const SafariApp = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState(url);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([url]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const navigate = (newUrl: string) => {
    let full = newUrl;
    if (!full.startsWith('http')) full = 'https://' + full;
    setUrl(full);
    setInputUrl(full);
    const newHistory = [...history.slice(0, historyIdx + 1), full];
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    setLoading(true);
  };

  const goBack = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setUrl(history[historyIdx - 1]);
      setInputUrl(history[historyIdx - 1]);
    }
  };

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setUrl(history[historyIdx + 1]);
      setInputUrl(history[historyIdx + 1]);
    }
  };

  return (
    <AppLayout title="" noPadding>
      <div className="flex flex-col h-full">
        {/* Address bar */}
        <div className="px-3 py-2 bg-muted">
          <div className="flex items-center gap-2 bg-background rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate(inputUrl)}
              className="flex-1 text-xs bg-transparent text-foreground outline-none"
              placeholder="Search or enter website name"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white relative">
          <iframe
            src={url}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms"
            onLoad={() => setLoading(false)}
            title="Safari"
          />
          {loading && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary animate-pulse" />
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-around py-2 bg-muted border-t border-border">
          <button onClick={goBack} disabled={historyIdx <= 0}>
            <ArrowLeft className={`w-5 h-5 ${historyIdx > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
          </button>
          <button onClick={goForward} disabled={historyIdx >= history.length - 1}>
            <ArrowRight className={`w-5 h-5 ${historyIdx < history.length - 1 ? 'text-primary' : 'text-muted-foreground'}`} />
          </button>
          <button onClick={() => setLoading(true)}>
            <RotateCw className="w-5 h-5 text-primary" />
          </button>
          <Globe className="w-5 h-5 text-primary" />
        </div>
      </div>
    </AppLayout>
  );
};
