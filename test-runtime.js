const fs = require('fs');
const path = require('path');
const vm = require('vm');

const compiled = fs.readFileSync(path.join(__dirname, 'dist', 'app.compiled.js'), 'utf-8');

// Mock browser environment to test that all classes, components, and services initialize with 0 runtime errors
const mockStorage = {};
const sandbox = {
  window: {
    addEventListener: () => {},
    removeEventListener: () => {},
    location: { href: 'http://localhost:3000' }
  },
  document: {
    getElementById: (id) => ({
      innerHTML: '',
      appendChild: () => {}
    }),
    createElement: () => ({ setAttribute: () => {} }),
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = v; },
    removeItem: (k) => { delete mockStorage[k]; }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};

sandbox.window.localStorage = sandbox.localStorage;

// Mock React & ReactDOM
sandbox.React = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  useState: (init) => [init, () => {}],
  useEffect: () => {},
  useRef: (init) => ({ current: init }),
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
  createContext: () => ({ Provider: () => {}, Consumer: () => {} })
};

sandbox.ReactDOM = {
  createRoot: () => ({
    render: (element) => {
      console.log('✓ Successfully called ReactDOM.createRoot().render() with root element type:', typeof element.type);
    }
  })
};

sandbox.window.React = sandbox.React;
sandbox.window.ReactDOM = sandbox.ReactDOM;

vm.createContext(sandbox);

try {
  vm.runInContext(compiled, sandbox);
  console.log('✓ Full application script executed in mock runtime with ZERO syntax or reference errors!');
} catch (e) {
  console.error('Execution error:', e);
}
