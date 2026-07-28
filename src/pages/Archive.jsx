import React from 'react';

export default function Archive() {
  const archiveItems = [
    {
      title: 'Glod Water',
      subtitle: 'Packaging design',
      image: '/images/glod_water.jpg',
      year: '2024'
    },
    {
      title: 'Puke Logo',
      subtitle: 'Branding identity / logo design',
      image: '/images/puke_logo.jpg',
      year: '2023'
    },
    {
      title: 'Back lighting & Street cycling study',
      subtitle: 'Cinematic photography / product testing',
      image: '/images/cyclist_tattoo.jpg',
      year: '2023'
    },
    {
      title: 'OSCAR OLSSON / DISCO VOLANTE',
      subtitle: 'Industrial design / component visualization',
      image: '/images/disco_volante.jpg',
      year: '2022'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 text-left transition-colors duration-300">
      {/* Header Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 pb-10 border-b border-neutral-850 dark:border-neutral-900">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
          Archived works
        </h1>
        <div className="flex flex-col justify-end">
          <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans max-w-sm lg:max-w-md">
            Series of past experiments and client work i've done along the years
          </p>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12">
        {archiveItems.map((item, idx) => (
          <div key={idx} className="group block">
            {/* Image Container */}
            <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-900 shadow-sm flex items-center justify-center p-6 md:p-8 aspect-[4/3]">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            {/* Details */}
            <div className="flex justify-between items-start mt-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">{item.subtitle}</p>
              </div>
              <span className="text-xs font-mono text-neutral-500">{item.year}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
