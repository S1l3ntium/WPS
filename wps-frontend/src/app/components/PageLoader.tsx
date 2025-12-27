export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center pointer-events-none animate-fade-in">
      {/* Simple rotating spinner */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

      {/* CSS for smooth animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-in-out;
        }

        .animate-fade-out {
          animation: fadeOut 0.2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
