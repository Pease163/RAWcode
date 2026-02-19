import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Loader2, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { trackGoal } from '@/app/lib/analytics';
import { formatPhone, looksLikePhone, validateContact } from '@/app/lib/validation';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: '',
    _hp: ''
  });
  const [agreed, setAgreed] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; contact?: string; service?: string; agreed?: string}>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState(-1);
  const serviceRef = useRef<HTMLDivElement>(null);
  const serviceOptions = ['Веб-разработка', 'Системы и платформы', 'Приложения'] as const;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleSelectPackage = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.packageName) {
        const pkg = detail.packageName as string;
        let service = '';
        if (pkg.includes('Веб-разработка')) service = 'Веб-разработка';
        else if (pkg.includes('Системы и платформы')) service = 'Системы и платформы';
        else if (pkg.includes('Приложения')) service = 'Приложения';
        if (service) {
          setFormData(prev => ({ ...prev, service }));
        }
      }
    };
    window.addEventListener('selectPackage', handleSelectPackage);
    return () => window.removeEventListener('selectPackage', handleSelectPackage);
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';
    const contactError = validateContact(formData.contact);
    if (contactError) newErrors.contact = contactError;
    if (!formData.service) newErrors.service = 'Выберите услугу';
    if (!agreed) newErrors.agreed = 'Необходимо согласие';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._hp) return;
    if (!validateForm()) return;

    setIsLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          project: formData.service,
          _hp: formData._hp
        }),
        signal: controller.signal
      });

      if (response.ok) {
        setIsSubmitted(true);
        trackGoal('form_submit', { service: formData.service });
      } else {
        try {
          const data = await response.json();
          setErrors({ service: data.error || 'Ошибка отправки' });
        } catch {
          setErrors({ service: 'Ошибка отправки. Попробуйте позже.' });
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setErrors({ service: 'Сервер не отвечает. Попробуйте позже.' });
      } else {
        setErrors({ service: 'Ошибка соединения с сервером' });
      }
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#0F0F11] border-2 border-white/10 rounded-2xl px-6 py-5 text-[#F4F4F0] placeholder:text-[#F4F4F0]/30 focus:outline-none focus:border-[#CCFF00] focus:shadow-[0_0_20px_rgba(204,255,0,0.15)] transition-all text-base md:text-lg';

  return (
    <div className="w-full bg-[#1E1E22] rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 border-[#CCFF00]/20 relative shadow-[0_0_50px_rgba(204,255,0,0.1)]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/10 blur-3xl"></div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-8 relative"
          >
            <div className="absolute" style={{ left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="_hp">Не заполняйте</label>
              <input
                id="_hp"
                name="_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
              />
            </div>

            <div className="space-y-8">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-[#CCFF00] text-sm font-bold uppercase tracking-wider mb-4">
                  Ваше имя
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Иван Иванов"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  required
                />
                {errors.name && <p role="alert" className="text-[#FF3B00] text-sm mt-3 font-medium">{errors.name}</p>}
              </div>

              {/* Contact field */}
              <div>
                <label htmlFor="contact" className="block text-[#CCFF00] text-sm font-bold uppercase tracking-wider mb-4">
                  Способ связи
                </label>
                <input
                  id="contact"
                  type="text"
                  placeholder="Телефон, email, Telegram..."
                  autoComplete="email"
                  value={formData.contact}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (looksLikePhone(raw) && raw.length > 0) {
                      setFormData({ ...formData, contact: formatPhone(raw) });
                    } else {
                      setFormData({ ...formData, contact: raw });
                    }
                    if (errors.contact) setErrors(prev => { const { contact: _, ...rest } = prev; return rest; });
                  }}
                  className={inputClass}
                  required
                />
                {errors.contact && <p role="alert" className="text-[#FF3B00] text-sm mt-3 font-medium">{errors.contact}</p>}
              </div>

              {/* Service dropdown with AnimatePresence */}
              <div ref={serviceRef} className="relative">
                <label className="block text-[#CCFF00] text-sm font-bold uppercase tracking-wider mb-4">
                  Что вас интересует?
                </label>
                <button
                  type="button"
                  onClick={() => { setServiceOpen(!serviceOpen); setFocusedOption(-1); }}
                  onKeyDown={(e) => {
                    if (!serviceOpen) {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        setServiceOpen(true);
                        setFocusedOption(0);
                      }
                      return;
                    }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setFocusedOption((prev) => (prev + 1) % serviceOptions.length);
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setFocusedOption((prev) => (prev - 1 + serviceOptions.length) % serviceOptions.length);
                    } else if (e.key === 'Enter' && focusedOption >= 0) {
                      e.preventDefault();
                      setFormData({ ...formData, service: serviceOptions[focusedOption] });
                      setServiceOpen(false);
                      setFocusedOption(-1);
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      setServiceOpen(false);
                      setFocusedOption(-1);
                    }
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={serviceOpen}
                  className={`w-full bg-[#0F0F11] border-2 rounded-2xl px-6 py-5 text-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    serviceOpen ? 'border-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.15)]' : 'border-white/10'
                  }`}
                >
                  <span className={formData.service ? 'text-[#F4F4F0]' : 'text-[#F4F4F0]/30'}>
                    {formData.service || 'Выберите услугу...'}
                  </span>
                  <motion.span
                    animate={{ rotate: serviceOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#F4F4F0]/50" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {serviceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      role="listbox"
                      className="absolute z-20 left-0 right-0 mt-2 bg-[#1E1E22] border-2 border-[#CCFF00]/30 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                    >
                      {serviceOptions.map((option, idx) => (
                        <motion.button
                          key={option}
                          type="button"
                          role="option"
                          aria-selected={formData.service === option}
                          whileHover={formData.service !== option ? { x: 4 } : {}}
                          onClick={() => {
                            setFormData({ ...formData, service: option });
                            setServiceOpen(false);
                            setFocusedOption(-1);
                          }}
                          className={`w-full px-6 py-4 text-lg text-left transition-all cursor-pointer ${
                            formData.service === option
                              ? 'bg-[#CCFF00]/15 text-[#CCFF00] font-semibold border-l-2 border-[#CCFF00]'
                              : focusedOption === idx
                                ? 'bg-[#CCFF00]/10 text-[#F4F4F0]'
                                : 'text-[#F4F4F0]/70 hover:bg-[#CCFF00]/10 hover:text-[#F4F4F0]'
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {errors.service && <p role="alert" className="text-[#FF3B00] text-sm mt-3 font-medium">{errors.service}</p>}
              </div>
            </div>

            {/* Privacy agreement */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); if (e.target.checked) setErrors(prev => { const { agreed: _, ...rest } = prev; return rest; }); }}
                  className="sr-only peer"
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  agreed
                    ? 'bg-[#CCFF00] border-[#CCFF00]'
                    : 'border-white/20 bg-transparent group-hover:border-white/40'
                }`}>
                  {agreed && <Check className="w-3.5 h-3.5 text-[#0F0F11] stroke-[3]" />}
                </div>
                <span className="text-sm text-[#D4D4D0]/70 group-hover:text-[#D4D4D0] transition-colors">
                  Я даю согласие на обработку персональных данных и соглашаюсь с{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">
                    политикой конфиденциальности
                  </a>
                  {' '}и{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">
                    условиями использования
                  </a>
                </span>
              </label>
              {errors.agreed && <p role="alert" className="text-[#FF3B00] text-sm mt-2 font-medium pl-8">{errors.agreed}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-[#CCFF00] text-[#0F0F11] rounded-2xl font-bold text-lg hover:bg-[#FF3B00] hover:text-white hover:scale-[1.02] transition-all duration-300 uppercase tracking-wider focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CCFF00]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_40px_rgba(255,59,0,0.4)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Отправка...</span>
                </>
              ) : (
                <>
                  <span>Отправить заявку</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 rounded-full bg-[#CCFF00] flex items-center justify-center mb-8"
            >
              <CheckCircle2 className="w-16 h-16 text-[#0F0F11]" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F4F4F0] mb-6 uppercase text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Заявка отправлена!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#D4D4D0] text-center leading-relaxed text-lg"
            >
              Спасибо за интерес к RawCode!<br />
              Мы свяжемся с вами в течение 24 часов.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', contact: '', service: '', _hp: '' });
                setAgreed(false);
                setErrors({});
              }}
              className="mt-8 px-8 py-3 border-2 border-white/20 text-[#D4D4D0] rounded-full font-medium hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300"
            >
              Отправить ещё заявку
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
