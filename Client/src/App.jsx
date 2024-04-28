import { ThemeProvider } from './ctxapi/ThemeContext';
import Router from './routers/Router';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>

    </>
  )
}