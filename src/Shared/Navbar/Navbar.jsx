import {} from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-primary shadow-sm z-50 p-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-900">
              <span className="text-primary">Style</span>Essence
            </h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
