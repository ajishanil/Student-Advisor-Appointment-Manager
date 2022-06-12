// // Main React app file

import Root from "./components/Root";
import "./App.css";

function App() {
  return (
    <div>
      <div className="display text-center ">
        {/* show message if screen size is less than 768px */}
        <h3>Please use a larger screen to view this website.</h3>
      </div>
      <div id="app">
        <Root />
      </div>
    </div>
  );
}

export default App;
