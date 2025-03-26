import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store.ts'
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './QueryClient/queryClient.ts'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </Provider>
  // </StrictMode>,
)
