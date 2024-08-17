import DWallet from "./DWallet";
import DTransaction from "./DTransaction";
import DBudget from "./DBudget";
import DWidget from "./DWidget";
export default function Dashboard() {


  return (
    <div>
      <div className="row">
        <div className="col-12">
          <DWallet/>
        </div>
        <DWidget />
        <div className="col-4">
          <DBudget />
        </div>
        <div className="col-8">
          <DTransaction/>
        </div>
      </div>
    </div>
  )
}