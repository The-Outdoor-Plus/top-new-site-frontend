"use client";

interface FirePit {
  id: number;
  title: string;
  image: string;
  link: string;
}

const firePits: FirePit[] = [
    {
      id: 1,
      title: "Fire Pits",
      image: "/images/fire-pit-1.jpg",
      link: "/fire-pits"
    },
    {
      id: 2,
      title: "Outdoor Fireplaces",
      image: "/images/outdoor-fireplace.jpg",
      link: "/outdoor-fireplaces"
    },
    {
      id: 3,
      title: "News",
      image: "/images/news.jpg",
      link: "/news"
    },
  ];

const FirePitCard: React.FC<{ firePit: FirePit }> = ({ firePit }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden">
      {/* Image container with overlay */}
      <div className="relative h-[350px] w-full">
        <img
          src={firePit.image}
          alt={firePit.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-700" />
      </div>
      
      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h3 className="text-white text-4xl font-extralight tracking-wider transition-all duration-700 group-hover:scale-110">
          {firePit.title}
        </h3>
      </div>
    </div>
  );
};

export function CategoriesSection() { 
  return (
      <div className="">
        {/* Header content */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-light mb-4">Experience Modern Fire</h2>
          <h3 className="text-base font-bold uppercase tracking-wider mb-6">
            MODERN FIRE PITS AND OUTDOOR FIREPLACES
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Text describing why The Outdoor Plus is the best place to find modern fire pits and outdoor fireplaces.
          </p>
        </div>
        
        {/* Grid of images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {firePits.map((firePit) => (
            <FirePitCard key={firePit.id} firePit={firePit} />
          ))}
        </div>
      </div>
  );
};