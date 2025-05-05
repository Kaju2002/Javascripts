import React from 'react';
import {
  FaSearch, FaGlobe, FaExchangeAlt, FaLandmark,
  FaFilter, FaChartPie, FaStar, FaMapMarkedAlt, FaMoneyBillWave
} from 'react-icons/fa';

const features = [
    // Define vibrant gradients for each feature
   { icon: <FaSearch />, title: 'Instant Country Search', description: 'Find any nation in seconds with our responsive, live search. Perfect for quick lookups or deep dives.', gradient: 'from-blue-500 to-cyan-400'},
   { icon: <FaGlobe />, title: 'Detailed Country Profiles', description: 'Access comprehensive data: flags, capitals, population, regions, languages, and more, presented clearly.', gradient: 'from-green-500 to-emerald-400'},
   { icon: <FaFilter />, title: 'Smart Filtering', description: 'Easily sort and view countries by region or language, streamlining your research or exploration.', gradient: 'from-purple-500 to-violet-400'},
   { icon: <FaMapMarkedAlt />, title: 'Interactive Maps', description: 'Visualize country locations and neighbors with integrated maps for better geographical context.', gradient: 'from-orange-500 to-amber-400'},
   { icon: <FaMoneyBillWave />, title: 'Real-Time Currency Info', description: 'Get up-to-date currency codes and symbols alongside country data. (Note: Live conversion may require external API)', gradient: 'from-teal-500 to-cyan-400'},
   { icon: <FaLandmark />, title: 'Cultural Highlights', description: 'Discover key landmarks and cultural insights, adding depth beyond simple statistics.', gradient: 'from-pink-500 to-rose-400'},
   { icon: <FaChartPie />, title: 'Visual Data Insights', description: 'Understand complex stats like population density through clear visual representations.', gradient: 'from-yellow-400 to-amber-300'},
   { icon: <FaStar />, title: 'Personalized Favorites', description: 'Save countries to your personal list for easy access later – ideal for trip planning or focused research.', gradient: 'from-indigo-500 to-blue-400'},
];

const Features = () => {
  return (
    // Section with relative positioning for pseudo-elements
    <section className="relative bg-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
     
   
      <div className="relative max-w-7xl mx-auto text-center dot-pattern"> {/* Added class for pattern */}

        {/* Section Header */}
        <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm sm:text-base">Explore Globalize</span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Unlock a World of Information
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          From essential stats to cultural insights, Globalize is designed for discovery. See what makes our platform unique.
        </p>

        {/* Features Grid */}
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            // Enhanced Card with more interactive hover
            <div
              key={index}
              // Apply animation class here if using IntersectionObserver/Framer Motion etc.
              // Example: className="animate-fade-in-up"
              className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 border border-gray-200/50 transition-all duration-300 ease-in-out hover:-translate-y-2 text-left flex flex-col z-10`} // Increased shadow/lift, ensure above pattern
            >
              {/* Icon Area */}
              <div className="mb-5">
                {/* Gradient Background, scales slightly on hover */}
                <div className={`inline-block p-3.5 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {React.cloneElement(feature.icon, { className: `text-2xl sm:text-3xl text-white` })} {/* White icon */}
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Features;