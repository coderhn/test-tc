import { createRoot } from 'react-dom/client';
import { Dashboard } from './dashboard';
import '../../style/index';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('app') as HTMLElement);
  root.render(<Dashboard />);
});
