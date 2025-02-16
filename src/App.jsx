
// import './App.css'

import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [charallowed, setCharAllowed] = useState(false);
  const [numberallow, setNumberallow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberallow) str += "0123456789";
    if (charallowed) str += "!@#$%&*~_=+|\*/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass);
  }, [length, charallowed, numberallow, setPassword])


  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password)
    alert("password copied to clipboard")
  }, [password])

  useEffect(() => {
    passwordgenerator();
  }, [length, numberallow, charallowed, passwordgenerator])

  return (
    <div className="container">
     <div className="main">
     <h1 className="heading">Password Generator</h1>
     <div className="input_field">
     <div>
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
      </div>
      <div>
        <button onClick={copyPasswordToClipBoard} className="copybtn">Copy</button>
      </div>
     </div>
    <div className="toolcontainer">
    <div className="length">
        <input type="range"
          value={length}
          min={6}
          max={12}
          onChange={(e) => setLength(e.target.value)}
          className="range"
        />
        <label htmlFor="">Length: {length}</label>
      </div>

      <div className="number">
        <input
          type="checkbox"
          defaultChecked={numberallow}
          id="numberInput"
          onChange={() => {
            setNumberallow((prev) => !prev);

          }}

        />
        <label htmlFor="number">Number</label>
      </div>
      <div className="char">
        <input type="checkbox"
          defaultChecked={charallowed}
          id="charinput"
          onChange={() => {
            setCharAllowed((prev) => !prev);

          }}
        />
        <label htmlFor="">Character</label>
      </div>
    </div>
    </div>
     </div>
  )
}

export default App
