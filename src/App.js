import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsageDetails from "./components/UsageDetails";
import BillingInformation from "./components/BillingInformation";
import InvoiceGeneration from "./components/InvoiceGeneration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/usage-details" element={<UsageDetails />} />
        <Route path="/billing-information" element={<BillingInformation />} />
        <Route path="/invoice-generation" element={<InvoiceGeneration />} />
      </Routes>
    </Router>
  );
}

export default App;
