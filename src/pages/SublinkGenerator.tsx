import { CheckCircle2, Copy, Plus } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { i18n } from '../i18n';

export function SublinkGenerator() {
  const { language, theme } = useAppContext();
  const t = i18n[language];
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let val = input.trim();
    const sanitized = val
      .replace(/allowinsecure=true/gi, 'allowInsecure=false')
      .replace(/allowinsecure=1/gi, 'allowInsecure=0')
      .replace(/allow_insecure=true/gi, 'allow_insecure=false')
      .replace(/allow_insecure=1/gi, 'allow_insecure=0');

    if (sanitized !== val) {
      val = sanitized;
      setInput(sanitized);
    }

    const isVless = val.toLowerCase().includes('vless://');
    const isTrojan = val.toLowerCase().includes('trojan://');
    
    if (!isVless && !isTrojan) {
      alert(language === 'my' ? 'VLESS သို့မဟုတ် Trojan Format မှားယွင်းနေပါသည်' : 'Invalid VLESS or Trojan format');
      return;
    }
    try {
      const encodedConfig = encodeURIComponent(val);
      const paramName = val.toLowerCase().startsWith('vless://') ? 'vless' : (val.toLowerCase().startsWith('trojan://') ? 'trojan' : 'vless');
      const sub = `https://notes.galaxy-tunnel.top/?${paramName}=${encodedConfig}`;
      
      setResult(sub);
      setCopied(false);
    } catch (e) {
      alert('Error generating sub link');
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">{t.sublinkTitle}</h1>
        <p className="text-sm font-medium text-stone-600 dark:text-stone-400 tracking-wide">{t.sublinkSubtitle}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-600 dark:text-stone-400 mb-2">
            {t.vlessLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="vless://uuid@host:port?..."
            className="w-full min-h-[100px] p-3 text-sm font-mono border border-stone-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y"
          />
        </div>

        <button
          onClick={generate}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t.generateBtn}</span>
        </button>

        {result && (
          <div className="bg-stone-50 dark:bg-zinc-800/50 border border-stone-200 dark:border-zinc-800 rounded-lg p-4 mt-6 animate-in fade-in slide-in-from-top-2">
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">
              {t.resultLabel}
            </div>
            
            <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-md p-3 text-xs font-mono text-stone-900 dark:text-stone-100 break-all max-h-[120px] overflow-y-auto mb-4">
              {result}
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0a1128] text-white p-5 shadow-xl mb-4 border border-blue-900/30 font-sans group">
              {/* Background glow effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                {/* QR Code Container */}
                <div className="shrink-0 bg-white p-3 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <QRCodeSVG 
                    value={result} 
                    size={160}
                    level="H"
                    fgColor="#0a1128"
                    bgColor="#ffffff"
                  />
                </div>

                {/* Card Details */}
                <div className="flex flex-col justify-between w-full h-full min-h-[160px] py-1">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-black italic text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 leading-none mb-1">
                        GALAXY<span className="text-cyan-400">-</span><br className="hidden sm:block" />
                        TUNNEL
                      </div>
                      <div className="text-gray-400 text-[10px] tracking-widest font-medium uppercase mt-2 sm:mt-1">
                        {input.toLowerCase().startsWith('vless://') ? 'VLESS CONFIG' : 'TROJAN CONFIG'}
                      </div>
                    </div>
                    <div className="font-black italic text-cyan-400 text-sm tracking-wide text-right leading-tight drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                      FREE<br/>ACCESS
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block flex-1" />

                  {/* Bottom Section */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-6 sm:mt-auto">
                    <div className="flex items-center gap-1.5 text-gray-300 text-xs font-medium">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-cyan-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                      <span>Scan to connect.</span>
                    </div>
                    <div className="text-right text-[10px] font-mono text-gray-400 leading-relaxed">
                      <div className="text-gray-300">EXP: UNLIMITED</div>
                      <div>DATE: {new Date().getFullYear()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyBtn}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
