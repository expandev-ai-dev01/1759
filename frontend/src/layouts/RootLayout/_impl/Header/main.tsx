import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Catálogo de Carros
          </Link>
          <nav>
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
