import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <div>
            <h1>Hello from React! 👋</h1>
        </div>
    );
};

// Find the HTML element where your React app will be rendered
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}