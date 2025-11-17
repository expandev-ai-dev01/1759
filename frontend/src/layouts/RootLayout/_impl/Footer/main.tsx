export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Catálogo de Carros. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
