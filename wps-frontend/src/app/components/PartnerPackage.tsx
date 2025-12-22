import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface PartnerPackageProps {
  package: {
    id: string;
    title: string;
    category: string;
    description: string;
    benefits: string[];
    downloadLink?: string;
    price?: string;
  };
}

export function PartnerPackage({ package: pkg }: PartnerPackageProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex gap-0">
        {/* Left side - Title and Description */}
        <div className="flex-shrink-0 w-[45%] bg-white border-r border-gray-200">
          <h3 className="text-2xl text-[#4db8b8] mb-4 leading-tight">{pkg.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{pkg.description}</p>
        </div>

        {/* Right side - Accordions */}
        <div className="flex-1 bg-white p-8">
          <div className="space-y-0">
            {/* Options accordion */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className="w-full flex items-center justify-between py-5 hover:opacity-70 transition-opacity"
              >
                <span className="text-[#1a1f4d]">Опции пакета</span>
                {isOptionsOpen ? (
                  <Minus className="w-5 h-5 text-[#4db8b8]" />
                ) : (
                  <Plus className="w-5 h-5 text-[#4db8b8]" />
                )}
              </button>
              {isOptionsOpen && (
                <div className="pb-6">
                  <ul className="space-y-3">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-[#4db8b8] mt-0.5 flex-shrink-0">•</span>
                        <span className="text-gray-600 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Price accordion */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="w-full flex items-center justify-between py-5 hover:opacity-70 transition-opacity"
              >
                <span className="text-[#1a1f4d]">Стоимость пакета</span>
                {isPriceOpen ? (
                  <Minus className="w-5 h-5 text-[#4db8b8]" />
                ) : (
                  <Plus className="w-5 h-5 text-[#4db8b8]" />
                )}
              </button>
              {isPriceOpen && (
                <div className="pb-6">
                  <p className="text-[#4db8b8]">
                    {pkg.price || 'Стоимость определяется индивидуально'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Button below accordions */}
          <div className="mt-6">
            <button className="bg-[#1a1f4d] hover:bg-[#2c3570] text-white px-6 py-2.5 rounded transition-colors text-sm">
              Стать партнером
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}