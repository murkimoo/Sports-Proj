import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import DateFilter from './components/DateFilter';
import MatchesList from './components/MatchesList';
import ErrorBoundary from './components/ErrorBoundary';
import styles from './App.module.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      retry: 3,
    },
  },
});

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <div className={styles.wrapper}>
            <Header />
            <main className={styles.content}>
              <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
              <MatchesList selectedDate={selectedDate} />
            </main>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;