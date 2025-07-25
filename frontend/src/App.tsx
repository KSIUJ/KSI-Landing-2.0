import {useState, useEffect} from "react"
import { fetchDbStatus } from "./api"

function App() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchDbStatus().then(data => setStatus(data.db_status));
  }, []);

  return (
    <>
    <div className="bg-amber-500">
      <p>dziala tailwind</p>
    </div>

    <div>
      <p>status bazy danych: {status}</p>
    </div>
    </>
  )
}

export default App
