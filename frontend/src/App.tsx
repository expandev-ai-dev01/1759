import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/lib/queryClient';
import { AppRouter } from '@/router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
