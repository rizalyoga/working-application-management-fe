import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button className="ml-8" size={"lg"} variant={"secondary"}>
        Click Me
      </Button>
    </>
  );
}

export default App;
