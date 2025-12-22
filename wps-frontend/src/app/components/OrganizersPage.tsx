import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function OrganizersPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage="organizers" />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[#1a1f4d] mb-12">
            Организаторы
          </h1>

          <div className="bg-white rounded-lg p-8 border border-gray-200 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Logo */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <img
                  src="placeholder.png"
                  alt="Ассамблея Народов Мира"
                  className="w-48 h-auto"
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-9">
                <h2 className="text-[#1a1f4d] mb-6">
                  Международный союз неправительственных организаций «Ассамблея Народов Мира»
                </h2>

                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p>
                    Ассамблея Народов Мира, являясь одним из международных институтов общественной дипломатии, реализует мероприятия и проекты, направленные на поддержку общественных объединительных стратегий солидарности, отвечающих стратегии сотрудничества народов в условиях многополярного мира.
                  </p>

                  <p>
                    Ассамблея открыта для диалога и партнерства со всеми, кто разделяет идеи гармоничного взаимодействия, координации и взаимодополнения усилий государственных и негосударственных организаций в деле сохранения мира и укрепления дружбы между народами. Для обсуждения и решения вопросов конструктивного взаимодействия представителей международного сообщества Ассамблеей Народов Мира инициирована Всемирная Общественная Ассамблея.
                  </p>
                </div>

                <div className="flex flex-col gap-4 max-w-sm">
                  <button 
                    className="w-full px-8 py-3 bg-[#1a1f4d] text-white rounded-lg hover:bg-[#252b5e] transition-colors"
                    onClick={() => window.open('https://worldpeoplesassembly.org/join', '_blank')}
                  >
                    Вступить в Ассамблею
                  </button>
                  <button 
                    className="w-full px-8 py-3 bg-white text-[#1a1f4d] border-2 border-[#1a1f4d] rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => window.open('https://worldpeoplesassembly.org', '_blank')}
                  >
                    Сайт Ассамблеи
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Greetings Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Greeting Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="placeholder.png"
                alt="Мигель Анхель Моратинос"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-[#1a1f4d] mb-3">
                  Мигель Анхель Моратинос, Заместитель Генерального секретаря ООН
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Всемирная Общественная Ассамблея и Альянс цивилизации Организации Объединенных Наций имеют общие цели в своей работе, поскольку обе организации стремятся прославлять единство в многообразии
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  20.09.2025
                </p>
                <button className="w-full px-6 py-3 bg-[#1a1f4d] text-white rounded-lg hover:bg-[#252b5e] transition-colors">
                  Читать приветствие
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}