import React from 'react';

export default function WeatherWidget() {
  const forecastData = [
    { day: 'WED', tempMax: '-3°', tempMin: '-6°', type: 'rain' },
    { day: 'THU', tempMax: '-1°', tempMin: '-9°', type: 'cloudy' },
    { day: 'FRI', tempMax: '-9°', tempMin: '-10°', type: 'rain' },
    { day: 'SAT', tempMax: '-4°', tempMin: '-6°', type: 'sunny' },
    { day: 'SUM', tempMax: '-4°', tempMin: '-6°', type: 'cloudy' },
    { day: 'Mon', tempMax: '-4°', tempMin: '-6°', type: 'rain' }
  ];

  const renderWeatherIcon = (type, colorClass = 'bg-neutral-400') => {
    switch (type) {
      case 'sunny':
        return (
          <div className="w-5 h-5 flex flex-wrap gap-[2px] items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-100 shadow-[0_0_4px_rgba(255,255,255,0.8)]"></div>
          </div>
        );
      case 'rain':
        return (
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-4 h-2 rounded-full bg-neutral-500 opacity-80"></div>
            <div className="flex gap-[2px]">
              <div className="w-[2px] h-[3px] bg-neutral-300 rounded-full animate-bounce"></div>
              <div className="w-[2px] h-[3px] bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-[2px] h-[3px] bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        );
      case 'cloudy':
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-[1px]">
            <div className="w-4 h-2.5 rounded-full bg-neutral-400 opacity-60"></div>
            <div className="w-3 h-2 rounded-full bg-neutral-500 opacity-40 -mt-1.5 -ml-1"></div>
          </div>
        );
    }
  };

  return (
    <div className="w-72 h-52 bg-neutral-900 border border-neutral-800 dark:border-neutral-900 rounded-3xl p-5 flex flex-col justify-between shadow-md">
      {/* Top Row - Temperature & City */}
      <div className="flex justify-between items-start">
        {/* Left: Temp */}
        <div className="flex items-center gap-3">
          {/* Main Weather Icon */}
          <div className="w-10 h-10 bg-neutral-800/80 rounded-2xl flex items-center justify-center border border-neutral-750">
            {renderWeatherIcon('rain')}
          </div>
          <div>
            <h3 className="text-3xl font-pixel font-bold leading-none text-neutral-100">30°</h3>
            <span className="text-[10px] font-mono text-neutral-500">H 35° L 16°</span>
          </div>
        </div>

        {/* Right: Location */}
        <div className="text-right">
          <p className="text-xs font-semibold text-neutral-200">Toronto</p>
          <span className="text-[10px] font-mono text-neutral-500">Party Cloudy</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800 opacity-50 my-2"></div>

      {/* Bottom Row - 6-Day Forecast */}
      <div className="grid grid-cols-6 gap-1 w-full text-center">
        {forecastData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-between gap-1 py-1 rounded-lg hover:bg-neutral-800/30 transition-colors">
            <span className="text-[9px] font-semibold text-neutral-400 font-sans uppercase">{item.day}</span>
            <div className="h-6 flex items-center justify-center">
              {renderWeatherIcon(item.type)}
            </div>
            <div className="flex flex-col text-[8px] font-mono leading-none mt-1">
              <span className="text-neutral-200 font-bold">{item.tempMax}</span>
              <span className="text-neutral-500 mt-[1px]">{item.tempMin}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
