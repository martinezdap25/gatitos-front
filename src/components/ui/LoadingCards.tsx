export function LoadingCards({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 animate-pulse flex flex-col items-center"
        >
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
          <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}