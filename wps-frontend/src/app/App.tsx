import { useRoutes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routes } from './routes';
import { PageLoader } from './components/PageLoader';

export default function App() {
  const element = useRoutes(routes);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShouldRender(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Show loader for 500ms

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {shouldRender && (
        <div className={isLoading ? '' : 'animate-fade-out'}>
          <PageLoader />
        </div>
      )}
      <div className={isLoading ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}>
        {element}
      </div>
      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out {
          animation: fadeOut 0.2s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
