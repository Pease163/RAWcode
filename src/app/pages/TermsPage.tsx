import { useEffect } from 'react';
import { motion } from 'motion/react';
import { fadeInUp } from '@/app/lib/animations';
import { Breadcrumbs } from '@/app/components/ui/Breadcrumbs';
import { useSEO } from '@/app/lib/seo';

export function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: 'Условия использования | RawCode Studio',
    description: 'Условия использования сайта RawCode Studio. Порядок оказания услуг, оплата, интеллектуальная собственность.',
    canonical: 'https://rawcode.studio/terms',
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rawcode.studio/' },
        { '@type': 'ListItem', position: 2, name: 'Условия использования' }
      ]
    }]
  });

  return (
    <main className="pt-28 pb-20 px-6">
      <motion.div {...fadeInUp} className="max-w-[800px] mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Условия использования' }]} />

        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F0] mb-12 uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Условия использования
        </h1>

        <div className="prose-custom space-y-8 text-[#D4D4D0] leading-relaxed">
          <p className="text-sm text-[#D4D4D0]/60">Дата последнего обновления: 19 февраля 2026 г.</p>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">1. Общие положения</h2>
            <p>
              Настоящие Условия использования регулируют порядок использования сайта rawcode.studio (далее — «Сайт»),
              принадлежащего ИП Сторожев Денис Максимович (RawCode Studio) (далее — «Компания»).
            </p>
            <p className="mt-3">
              Настоящие Условия не являются публичной офертой в соответствии со ст. 437 Гражданского кодекса
              Российской Федерации. Информация на Сайте носит информационный характер.
            </p>
            <p className="mt-3">
              Используя Сайт, вы подтверждаете согласие с данными Условиями. Если вы не согласны, пожалуйста,
              прекратите использование Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">2. Услуги</h2>
            <p>
              Компания оказывает услуги по разработке веб-сайтов, веб-приложений и цифровых продуктов.
              Конкретный перечень услуг, сроки и стоимость определяются индивидуально для каждого проекта
              и фиксируются в отдельном договоре.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">3. Порядок оказания услуг</h2>
            <p>
              Услуги оказываются на основании индивидуального договора, заключаемого между Компанией и Клиентом.
              Заявка, оставленная на Сайте, не является заключением договора и служит для установления
              первичного контакта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">4. Цены и оплата</h2>
            <p>
              Цены на услуги, указанные на Сайте, являются ориентировочными и не являются публичной офертой
              (ст. 437 ГК РФ). Окончательная стоимость определяется и фиксируется в индивидуальном договоре.
            </p>
            <p className="mt-3">
              Оплата осуществляется по счёту в порядке и сроки, определённые договором.
              ИП Сторожев Д.М. не является плательщиком НДС.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">5. Калькулятор стоимости</h2>
            <p>
              Калькулятор на Сайте предоставляет приблизительную оценку стоимости. Точная стоимость определяется
              после обсуждения деталей проекта и может отличаться от расчётной.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">6. Интеллектуальная собственность</h2>
            <p>
              Все материалы Сайта (тексты, дизайн, код, логотипы) являются интеллектуальной собственностью Компании
              и защищены законодательством РФ. Копирование и распространение без письменного согласия запрещено.
            </p>
            <p className="mt-3">
              Права на результат разработки переходят Клиенту после полной оплаты, если иное
              не предусмотрено договором.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">7. Отказ от услуг</h2>
            <p>
              Клиент вправе отказаться от услуг до начала выполнения работ без каких-либо последствий.
            </p>
            <p className="mt-3">
              После начала выполнения работ отказ возможен с оплатой фактически выполненного объёма
              работ в соответствии со ст. 32 Закона РФ «О защите прав потребителей».
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">8. Ответственность</h2>
            <p>
              Компания не несёт ответственности за временную недоступность Сайта, технические сбои,
              а также за содержание сторонних сайтов, на которые ведут ссылки с Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">9. Порядок разрешения споров</h2>
            <p>
              Все споры и разногласия, возникающие в связи с использованием Сайта, разрешаются
              путём переговоров.
            </p>
            <p className="mt-3">
              При недостижении согласия споры подлежат рассмотрению в суде по месту нахождения
              Компании (г. Калининград) в соответствии с законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">10. Изменение условий</h2>
            <p>
              Компания оставляет за собой право изменять настоящие Условия. Актуальная версия
              всегда доступна на данной странице.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F4F4F0] mb-4">11. Контакты</h2>
            <p>
              По всем вопросам обращайтесь:
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
