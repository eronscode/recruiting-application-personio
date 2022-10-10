import { BrowserRouter, Route, Routes } from "react-router-dom";
import Applications from "pages/ViewApplications";
import ErrorHandler from "./ErrorHandler";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Routes>
          <Route path="/" element={<Applications />} />
        </Routes>
      </ErrorHandler>
    </BrowserRouter>
  );
};

export default App;
