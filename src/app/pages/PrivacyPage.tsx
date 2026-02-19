import { useEffect } from 'react';
import { motion } from 'motion/react';
import { fadeInUp } from '@/app/lib/animations';
import { Breadcrumbs } from '@/app/components/ui/Breadcrumbs';
import { useSEO } from '@/app/lib/seo';

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'Политика конфиденциальности | RawCode Studio',
    description: 'Политика конфиденциальности RawCode Studio. Порядок обработки и защиты персональных данных пользователей сайта rawcode.studio.',
    canonical: 'https://rawcode.studio/privacy',
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rawcode.studio/' },
        { '@type': 'ListItem', position: 2, name: 'Политика конфиденциальности' }
      ]
    }]
  });

  return (
    <main className="pt-28 pb-20 px-6">
      <motion.div {...fadeInUp} className="max-w-[800px] mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Политика конфиденциальности' }]} />

        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F0] mb-12 uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Политика конфиденциальности
        </h1>

        <div className="prose-custom space-y-8 text-[#D4D4D0] leading-relaxed">
          <p className="text-sm text-[#D4D4D0]/60">Дата последнего обновления: 19 февраля 2026 г.</p>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
              пользователей сайта rawcode.studio (далее — «Сайт»).
            </p>
            <p className="mt-3">
              Оператор персональных данных: ИП Сторожев Денис Максимович (RawCode Studio),
              ИНН 390612020954, ОГРНИП 324390000044121, г. Калининград (далее — «Компания»).
            </p>
            <p className="mt-3">
              Используя Сайт и предоставляя свои персональные данные, вы соглашаетесь с условиями данной Политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">2. Правовое основание обработки</h2>
            <p>
              Обработка персональных данных осуществляется на основании согласия субъекта персональных данных
              (п. 1 ч. 1 ст. 6 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»).
            </p>
            <p className="mt-3">
              Согласие предоставляется путём заполнения формы обратной связи на Сайте и отметки
              соответствующего чекбокса.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">3. Какие данные мы собираем</h2>
            <p>При использовании формы обратной связи мы можем собирать следующие данные:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Имя</li>
              <li>Контактные данные (телефон, email, Telegram)</li>
              <li>Информация об интересующей услуге</li>
            </ul>
            <p className="mt-3">
              Также автоматически может собираться техническая информация: IP-адрес, тип браузера,
              время посещения — для аналитики и улучшения работы Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">4. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обработка заявок и связь с вами по проектам</li>
              <li>Улучшение качества сервиса и Сайта</li>
              <li>Аналитика посещаемости</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">5. Способы обработки данных</h2>
            <p>
              Обработка персональных данных включает следующие действия (ст. 3 152-ФЗ): сбор, запись,
              систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение,
              использование, удаление, уничтожение персональных данных.
            </p>
            <p className="mt-3">
              Обработка осуществляется с использованием средств автоматизации и без таковых.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">6. Сроки хранения данных</h2>
            <p>
              Персональные данные хранятся не более 1 (одного) года с момента получения заявки,
              после чего подлежат уничтожению (ст. 5 152-ФЗ).
            </p>
            <p className="mt-3">
              Обработка персональных данных также прекращается при отзыве согласия субъектом
              персональных данных.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">7. Защита данных</h2>
            <p>
              Мы принимаем необходимые технические и организационные меры для защиты ваших персональных данных
              от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">8. Передача данных третьим лицам и трансграничная передача</h2>
            <p>
              Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением случаев,
              предусмотренных законодательством РФ, а также следующих случаев:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Данные заявок (имя, контакт, услуга) передаются через сервис Telegram для оперативного
                уведомления ответственных лиц Компании. Серверы Telegram могут находиться за пределами
                Российской Федерации (ст. 12 152-ФЗ).
              </li>
              <li>
                Аналитические системы (Яндекс.Метрика, MS Clarity) могут обрабатывать IP-адреса и данные
                о поведении пользователей на Сайте в целях аналитики.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">9. Cookies</h2>
            <p>
              Сайт может использовать cookies для аналитики и улучшения пользовательского опыта.
              Вы можете отключить cookies в настройках браузера.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">10. Ваши права</h2>
            <p>В соответствии с 152-ФЗ вы имеете право:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Получить информацию об обработке ваших персональных данных</li>
              <li>Потребовать уточнения, блокировки или уничтожения персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Компании в уполномоченном органе — Роскомнадзоре
                (<a href="https://rkn.gov.ru" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">rkn.gov.ru</a>)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">11. Порядок отзыва согласия</h2>
            <p>
              Вы вправе в любой момент отозвать своё согласие на обработку персональных данных,
              направив письменный запрос на электронную почту Компании:{' '}
              <a href="mailto:denisdikarvit@gmail.com" className="text-[#CCFF00] hover:underline">
                denisdikarvit@gmail.com
              </a>.
            </p>
            <p className="mt-3">
              Обработка персональных данных прекращается в течение 30 дней с момента получения
              запроса (ст. 9 152-ФЗ).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">12. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <ul className="list-none mt-3 space-y-2">
              <li>ИП Сторожев Денис Максимович</li>
              <li>ИНН: 390612020954</li>
              <li>ОГРНИП: 324390000044121</li>
              <li>Email: <a href="mailto:denisdikarvit@gmail.com" className="text-[#CCFF00] hover:underline">denisdikarvit@gmail.com</a></li>
              <li>Телефон: <a href="tel:+79211095430" className="text-[#CCFF00] hover:underline">+7 (921) 109-54-30</a></li>
              <li>Адрес: г. Калининград</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
