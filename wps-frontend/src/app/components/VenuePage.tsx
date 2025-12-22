import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight, ArrowRight } from 'lucide-react';
const venueImage = 'placeholder.png';

export function VenuePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="home" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8]">Главная</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">О Всемирной Ассамблее</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title */}
          <h1 className="text-[#1a1f4d] text-center mb-16">Место проведения</h1>

          {/* Venue Info */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-[#1a1f4d] mb-4">Конгресс-центр ЦМТ</h2>
              <p className="text-gray-700 mb-6">
                Москва, Краснопресненская набережная, дом 12
              </p>
              <a 
                href="https://maps.yandex.ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#4db8b8] hover:text-[#3da3a3] transition-colors"
              >
                Смотреть на карте
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div>
              <img 
                src={venueImage} 
                alt="Конгресс-центр ЦМТ"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* How to Get There */}
          <div>
            <h2 className="text-[#1a1f4d] mb-12">Как добраться</h2>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
              {/* By Metro */}
              <div>
                <h3 className="text-[#1a1f4d] mb-4">На метро</h3>
                <p className="text-gray-700 leading-relaxed">
                  Метро «Улица 1905 года» (выход к ул. Красная Пресня), Автобус №323С от метро «Улица 1905 года» (заезжает на территорию ЦМТ)
                </p>
              </div>

              {/* Walking from Metro */}
              <div>
                <h3 className="text-[#1a1f4d] mb-4">Пешком от метро</h3>
                <p className="text-gray-700 leading-relaxed">
                  Путь пешком занимает около 20 минут (примерно 1 км): следует идти вниз по улице 1905 года по направлению к Краснопресненской набережной до комплекса зданий Центра международной торговли
                </p>
              </div>

              {/* By Car */}
              <div>
                <h3 className="text-[#1a1f4d] mb-4">На машине</h3>
                <p className="text-gray-700 leading-relaxed">
                  Въезды со стороны Краснопресненской набережной и Мантулинской улицы
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}