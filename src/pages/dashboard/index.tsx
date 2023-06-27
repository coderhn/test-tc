import { createRoot } from 'react-dom/client';
import { Dashboard } from './dashboard';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('app') as HTMLElement);
  root.render(<Dashboard />);
});
