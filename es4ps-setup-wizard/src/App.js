import './App.css';
import SetupWizard from './components/SetupWizard.js';
// All the other required components are imported by the
// SetupWizard component and its children.

function App() {
  return (
      <div class="App">
        <SetupWizard />
      </div>
  );
}

export default App;
