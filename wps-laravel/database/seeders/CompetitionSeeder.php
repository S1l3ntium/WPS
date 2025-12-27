<?php

namespace Database\Seeders;

use App\Models\Competition;
use App\Models\CompetitionFaq;
use Illuminate\Database\Seeder;

class CompetitionSeeder extends Seeder
{
    public function run(): void
    {
        // Грант на инновационные проекты
        $competition1 = Competition::create([
            'type' => 'Grant',
            'name' => [
                'ru' => 'Грант на инновационные проекты',
                'en' => 'Grant for Innovative Projects'
            ],
            'description' => [
                'ru' => 'Программа поддержки инновационных проектов в области технологий, здравоохранения, экологии и образования. Предоставляется финансирование до $50,000 для реализации проектов с глобальным потенциалом.',
                'en' => 'A program supporting innovative projects in technology, healthcare, environment, and education sectors. Funding up to $50,000 is provided for projects with global potential and impact.'
            ],
            'timeline_opening' => '2025-01-15',
            'timeline_opening_end_date' => '2025-01-31',
            'timeline_closing' => '2025-03-01',
            'timeline_closing_end_date' => '2025-03-31',
            'timeline_announcement' => '2025-05-15',
            'eligibility_age_min' => 21,
            'eligibility_age_max' => 65,
            'eligibility_requirements' => [
                'Имеют опыт работы минимум 2 года в соответствующей области',
                'Представляют четкий план развития проекта',
                'Команда состоит из минимум 2 человек',
                'Проект не реализуется в коммерческих целях'
            ],
            'support_areas' => [
                'Искусственный интеллект и машинное обучение',
                'Чистые технологии и устойчивое развитие',
                'Цифровое здравоохранение',
                'Образовательные инновации'
            ],
        ]);

        // FAQ для Гранта на инновации
        CompetitionFaq::create([
            'competition_id' => $competition1->id,
            'question' => ['ru' => 'Кто может участвовать в конкурсе?', 'en' => 'Who is eligible to apply?'],
            'answer' => ['ru' => 'Могут участвовать граждане в возрасте от 21 до 65 лет с опытом работы не менее 2 лет в соответствующей сфере. Как физические лица, так и представители организаций могут подавать заявки.', 'en' => 'Citizens aged 21-65 with at least 2 years of professional experience in relevant fields can apply. Both individuals and organizational representatives can submit applications.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition1->id,
            'question' => ['ru' => 'Какой размер финансирования предусмотрен?', 'en' => 'What is the funding amount?'],
            'answer' => ['ru' => 'Финансирование составляет от $20,000 до $50,000 в зависимости от масштаба и потенциала проекта. Победители также получат доступ к сети наставников и инвесторов.', 'en' => 'Funding ranges from $20,000 to $50,000 depending on project scale and potential. Winners also gain access to a network of mentors and investors.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition1->id,
            'question' => ['ru' => 'Когда будут объявлены результаты?', 'en' => 'When will results be announced?'],
            'answer' => ['ru' => 'Результаты конкурса будут объявлены 15 мая 2025 года. Победители будут уведомлены индивидуально за неделю до публичного объявления.', 'en' => 'Results will be announced on May 15, 2025. Winners will be notified individually one week before the public announcement.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition1->id,
            'question' => ['ru' => 'Как подать заявку?', 'en' => 'How to submit an application?'],
            'answer' => ['ru' => 'Заявку необходимо подать через официальный портал до 31 марта 2025 года. Требуется загрузить резюме, описание проекта, бюджет и письма поддержки от партнеров.', 'en' => 'Submit your application through the official portal by March 31, 2025. You need to upload a resume, project description, budget, and support letters from partners.'],
        ]);

        // Премия за выдающееся лидерство
        $competition2 = Competition::create([
            'type' => 'Award',
            'name' => [
                'ru' => 'Премия за выдающееся лидерство',
                'en' => 'Award for Outstanding Leadership'
            ],
            'description' => [
                'ru' => 'Престижная премия, признающая выдающихся лидеров, внесших значительный вклад в развитие своих сообществ и стран. Премия награждает людей, демонстрирующих визионерское лидерство, социальную ответственность и инновационное мышление.',
                'en' => 'A prestigious award recognizing outstanding leaders who have made significant contributions to the development of their communities and nations. The award honors individuals demonstrating visionary leadership, social responsibility, and innovative thinking.'
            ],
            'timeline_opening' => '2025-02-01',
            'timeline_opening_end_date' => '2025-02-28',
            'timeline_closing' => '2025-04-01',
            'timeline_closing_end_date' => '2025-04-15',
            'timeline_announcement' => '2025-06-20',
            'eligibility_age_min' => 30,
            'eligibility_age_max' => null,
            'eligibility_requirements' => [
                'Имеют не менее 10 лет профессионального опыта на руководящих должностях',
                'Продемонстрировали значительное влияние на развитие своей организации или сообщества',
                'Активно занимаются социальной ответственностью и благотворительной деятельностью',
                'Имеют рекомендации от минимум 3 авторитетных источников'
            ],
            'support_areas' => [
                'Государственное управление и политика',
                'Деловое сообщество и предпринимательство',
                'Образование и научные исследования',
                'Социальное развитие и благотворительность'
            ],
        ]);

        // FAQ для Премии за лидерство
        CompetitionFaq::create([
            'competition_id' => $competition2->id,
            'question' => ['ru' => 'Какие требования к кандидатам?', 'en' => 'What are the candidate requirements?'],
            'answer' => ['ru' => 'Кандидаты должны быть минимум 30 лет, иметь не менее 10 лет опыта на руководящих позициях и продемонстрировать значительный вклад в развитие своей сферы деятельности.', 'en' => 'Candidates must be at least 30 years old, have at least 10 years of leadership experience, and demonstrate significant contributions to their field.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition2->id,
            'question' => ['ru' => 'Какие документы необходимо предоставить?', 'en' => 'What documents are required?'],
            'answer' => ['ru' => 'Требуется полное резюме, биография (до 2000 слов), портфолио достижений, и письма рекомендации от минимум 3 авторитетных лиц, включая коллег, партнеров или официальных лиц.', 'en' => 'Required documents include a complete resume, biography (up to 2000 words), portfolio of achievements, and recommendation letters from at least 3 authoritative figures including colleagues, partners, or officials.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition2->id,
            'question' => ['ru' => 'Какой призовой фонд и привилегии?', 'en' => 'What are the prizes and benefits?'],
            'answer' => ['ru' => 'Победители получают денежный приз $100,000, золотую медаль, приглашение на международный саммит и место в Совете почетных гостей с статусом амбассадора программы.', 'en' => 'Winners receive a cash prize of $100,000, a gold medal, an invitation to the international summit, and a position as an ambassador with honorary guest status.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition2->id,
            'question' => ['ru' => 'Как часто проводится конкурс?', 'en' => 'How often is the award held?'],
            'answer' => ['ru' => 'Премия проводится ежегодно. Приемка заявок открывается 1 февраля и закрывается 15 апреля каждого года. Результаты объявляются в июне на торжественной церемонии.', 'en' => 'The award is held annually. Applications open on February 1st and close on April 15th each year. Results are announced in June at a ceremonial event.'],
        ]);

        // Грант на молодежные социальные инициативы
        $competition3 = Competition::create([
            'type' => 'Grant',
            'name' => [
                'ru' => 'Грант на молодежные социальные инициативы',
                'en' => 'Grant for Youth Social Initiatives'
            ],
            'description' => [
                'ru' => 'Программа финансирования молодежных проектов, направленных на решение актуальных социальных и экологических проблем. Поддерживаются проекты молодежных организаций, НГО и молодых предпринимателей.',
                'en' => 'A funding program for youth projects addressing urgent social and environmental issues. Supports projects from youth organizations, NGOs, and young entrepreneurs.'
            ],
            'timeline_opening' => '2025-01-20',
            'timeline_opening_end_date' => null,
            'timeline_closing' => '2025-04-20',
            'timeline_closing_end_date' => null,
            'timeline_announcement' => '2025-06-01',
            'eligibility_age_min' => 18,
            'eligibility_age_max' => 35,
            'eligibility_requirements' => [
                'Участники в возрасте от 18 до 35 лет',
                'Проект должен иметь четкое социальное или экологическое воздействие',
                'Минимум один участник должен быть резидентом развивающейся страны',
                'Готовность к менторству и участию в обучающих программах'
            ],
            'support_areas' => [
                'Климат и экология',
                'Занятость молодежи',
                'Образование и навыки',
                'Инклюзивность и разнообразие',
                'Здоровье и благополучие'
            ],
        ]);

        // FAQ для Гранта на молодежные инициативы
        CompetitionFaq::create([
            'competition_id' => $competition3->id,
            'question' => ['ru' => 'Может ли молодежная организация подать коллективную заявку?', 'en' => 'Can a youth organization submit a collective application?'],
            'answer' => ['ru' => 'Да, коллективные заявки приветствуются. Организация должна иметь действующую регистрацию и минимум 5 членов, из которых большинство должны быть в возрасте 18-35 лет.', 'en' => 'Yes, collective applications are welcome. The organization must have valid registration and at least 5 members, with the majority being aged 18-35.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition3->id,
            'question' => ['ru' => 'Какой размер гранта для молодежных проектов?', 'en' => 'What is the grant size for youth projects?'],
            'answer' => ['ru' => 'Гранты варьируются от $5,000 до $30,000 в зависимости от масштаба и потенциала проекта. Есть возможность получить дополнительное финансирование для реализации пилотного проекта.', 'en' => 'Grants range from $5,000 to $30,000 depending on project scale and potential. Additional funding is available for pilot project implementation.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition3->id,
            'question' => ['ru' => 'Нужна ли прошлая опыт реализации проектов?', 'en' => 'Is previous project experience required?'],
            'answer' => ['ru' => 'Прошлый опыт приветствуется, но не является обязательным. Мы ценим инновационные идеи и готовность учиться. Победители получат доступ к менторству от опытных специалистов.', 'en' => 'Previous experience is welcomed but not required. We value innovative ideas and willingness to learn. Winners will have access to mentorship from experienced professionals.'],
        ]);

        // Грант на исследования в области устойчивого развития
        $competition4 = Competition::create([
            'type' => 'Grant',
            'name' => [
                'ru' => 'Грант на исследования в области устойчивого развития',
                'en' => 'Grant for Sustainable Development Research'
            ],
            'description' => [
                'ru' => 'Поддержка научных исследований, направленных на достижение целей устойчивого развития ООН. Финансируются проекты, способствующие решению глобальных вызовов в области климата, энергии, воды и продовольствия.',
                'en' => 'Support for scientific research aimed at achieving the UN Sustainable Development Goals. Projects that contribute to solving global challenges in climate, energy, water, and food security are funded.'
            ],
            'timeline_opening' => '2025-03-01',
            'timeline_opening_end_date' => null,
            'timeline_closing' => '2025-05-31',
            'timeline_closing_end_date' => null,
            'timeline_announcement' => '2025-07-15',
            'eligibility_age_min' => 25,
            'eligibility_age_max' => null,
            'eligibility_requirements' => [
                'Исследователь должен иметь как минимум степень магистра в соответствующей области',
                'Должен быть аффилирован с признанным исследовательским учреждением',
                'Опыт опубликованных исследований минимум 2 года',
                'Исследование должно быть оригинальным и не финансироваться другими источниками'
            ],
            'support_areas' => [
                'Климатические изменения и экология',
                'Возобновляемая энергия',
                'Чистая вода и санитария',
                'Устойчивое сельское хозяйство',
                'Биоразнообразие'
            ],
        ]);

        // FAQ для Гранта на исследования
        CompetitionFaq::create([
            'competition_id' => $competition4->id,
            'question' => ['ru' => 'Могут ли участвовать исследователи из развивающихся стран?', 'en' => 'Can researchers from developing countries participate?'],
            'answer' => ['ru' => 'Да, мы особенно приветствуем участие исследователей из развивающихся стран. Мы предоставляем дополнительную поддержку и менторство для укрепления научной базы в этих регионах.', 'en' => 'Yes, we especially welcome researchers from developing countries. We provide additional support and mentorship to strengthen the scientific base in these regions.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition4->id,
            'question' => ['ru' => 'Какой размер финансирования для исследований?', 'en' => 'What is the research funding amount?'],
            'answer' => ['ru' => 'Финансирование варьируется от $30,000 до $100,000 на 2-3 года в зависимости от амбициозности и масштаба исследования. Может включать стипендии для аспирантов и оборудование.', 'en' => 'Funding ranges from $30,000 to $100,000 for 2-3 years depending on research scope and ambition. May include graduate scholarships and equipment costs.'],
        ]);

        CompetitionFaq::create([
            'competition_id' => $competition4->id,
            'question' => ['ru' => 'Требуется ли выполнение проекта в определенной стране?', 'en' => 'Must the research be conducted in a specific country?'],
            'answer' => ['ru' => 'Нет, исследование может быть проведено в любой стране. Однако мы приветствуем исследования, сосредоточенные на проблемах развивающихся стран и с участием местных сообществ.', 'en' => 'No, research can be conducted in any country. However, we encourage research focused on challenges in developing countries with community participation.'],
        ]);
    }
}
