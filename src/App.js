import { useState } from "react";
import "./App.css";
import Table from "./component/table/Table";

function App() {
  const [currentId, setCurrentId] = useState(null);
  return (
    <div className="App">
      <Table currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
}

export default App;
