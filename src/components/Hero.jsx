import React, { useState } from 'react';

const slideData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // CHECK ME
        alt: 'Illuminated London Eye reflecting on the Thames, symbolizing global city hubs',
        title: 'Globalize Urban Insights',
        description: 'Connect with the world\'s major cities. Visualize populations, capitals, and economic centers instantly using Globalize.',
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1948&q=80', // CHECK ME
        alt: 'Winding river through a misty mountain forest, representing diverse global geography',
        title: 'Globalize Natural Wonders',
        description: 'Map diverse regions and terrains. Globalize helps you explore continents and understand geographical connections.',
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1883&q=80', // CHECK ME
        alt: 'Busy, colorful street market showing diverse people and culture',
        title: 'Globalize Cultural Connections',
        description: 'Discover the spectrum of human languages and cultures. Globalize brings the world\'s diverse heritage to your fingertips.',
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1581091877018-dac6a37a49f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // <<< CHECK THIS ONE!!!
        alt: 'Abstract network lines glowing, representing interconnected global data',
        title: 'Globalize World Data',
        description: 'Access comprehensive, up-to-date country information effortlessly. Globalize connects you to the REST Countries API.',
      },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index) => {
    if (index >= 0 && index < slideData.length) {
        setActiveIndex(index);
    }
  };

  // Fallback logic remains important
  const currentSlide = slideData && slideData.length > activeIndex ? slideData[activeIndex] : slideData[0];

  const stats = [
    { name: 'Countries Data Points', value: '250+' },
    { name: 'Global Regions', value: 'All UN Regions' },
    { name: 'Info Categories', value: 'Dozens' },
    { name: 'Project', value: 'Globalize' },
  ];

  return (
    // Make the container full screen height and use flexbox for vertical arrangement
    <div className="relative isolate overflow-hidden bg-gray-900 min-h-screen flex flex-col">

      {/* Background Image Container */}
      <div className="absolute inset-0 -z-20">
        {slideData.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
                console.error(`🔴 Image Load Error: Index ${index}, URL: ${slide.src}`);
                
            }}
          />
        ))}
      </div>

      {/* Enhanced Dark Overlay - More transparent in center */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/80 via-black/40 to-black/80" />

      {/* Decorative Shapes (Low z-index) */}
      {/* ... clipPath divs remain the same, ensure they are -z-10 ... */}
        <div aria-hidden="true" className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
            <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                 className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#1a5f7a] to-[#003f5c] opacity-15" /> 
        </div>
        <div aria-hidden="true" className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
            <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                 className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#1a5f7a] to-[#003f5c] opacity-15" /> 
        </div>


      <div className="mx-auto flex flex-col flex-grow justify-center max-w-7xl w-full px-6 py-12 lg:px-8 z-10">

        <div className="mx-auto max-w-3xl text-center flex-grow flex flex-col justify-center">
           <div key={currentSlide?.id || activeIndex} className="animate-fade-in">
              {currentSlide && (
                  <>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
                        {currentSlide.title}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-100 sm:text-xl max-w-2xl mx-auto drop-shadow-md"> 
                        {currentSlide.description}
                    </p>
                  </>
              )}
            </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
             <a
              href="#countries-list"
              className="rounded-md bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 transition duration-150 ease-in-out transform hover:scale-105" // Added scale transform
            >
              Explore with Globalize
            </a>
             <a
               href="https://github.com/YOUR_USERNAME/YOUR_REPO" 
               target="_blank"
               rel="noopener noreferrer"
               className="text-sm font-semibold leading-6 text-gray-200 hover:text-white transition duration-150 ease-in-out"
            >
              View Project Code <span aria-hidden="true">→</span>
             </a>
          </div>
        </div>

        <div className="mt-12 mb-8 flex justify-center gap-x-4"> 
          {slideData.map((_, index) => (
            // --- DEFAULT DOTS ---
            <button
              key={`dot-${index}`}
              onClick={() => handleNavClick(index)}
              aria-label={`View slide ${index + 1}: ${slideData[index]?.title || ''}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 ${
                index === activeIndex ? 'bg-teal-400 scale-125 ring-2 ring-teal-400 ring-offset-1' : 'bg-gray-600 hover:bg-gray-400' // Darker inactive dots
              }`}
             />
           
          ))}
        </div>

      </div> {/* End Main Content Flex container */}


      {/* 3. Statistics Section (Bottom of the screen) */}
       <div className="mx-auto max-w-4xl w-full px-6 pb-16 lg:px-8 z-10"> {/* Added padding-bottom, ensure z-10 */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4 lg:gap-x-8">
                {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse items-center">
                    <dd className="text-3xl font-semibold tracking-tight text-white sm:text-4xl drop-shadow-sm">
                    {stat.value}
                    </dd>
                    <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                </div>
                ))}
            </dl>
        </div>

    </div> // End Full Screen Container
  );
};

export default Hero;

