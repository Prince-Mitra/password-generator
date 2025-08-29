import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [length, setlength] = useState(6);
  const [numberAllow, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordgenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllow){
      str+='1234567890';
    }
    if(characterAllowed){
      str+='!@#$%^&*_+~,.<>/?';
    }
    for(let i=1;i<length;i++){
      let char =Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);

  },[length,numberAllow,characterAllowed,setPassword]);

  const passwordRef = useRef(null);

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordgenerator();
  },[length,numberAllow,characterAllowed,passwordgenerator])
  return (
    <>
      <div className="container">
        <h3>Password Generator</h3>

        <div className="inputfield">
          <input type="text"
           className="password-output"
           min={6}
           max={80}
           value={password}
           ref={passwordRef}
           readOnly
            />
          <button className="copy-btn" onClick={copyPassword}>Copy</button>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="length">Length{length}</label>
            <input type="range" 
             id="length"
             className="range-slider"
             value={length}
             onChange={(e)=>{setlength(e.target.value)}}
             
              />
          </div>

          <div className="filter-group">
            <label htmlFor="number">
              <input type="checkbox"
               id="number"
               value={numberAllow}
               onChange={()=>{
                setNumberAllowed((prev)=>!prev)
               }}
                />
              Number{numberAllow}
            </label>
          </div>

          <div className="filter-group">
            <label htmlFor="character">
              <input type="checkbox"
               id="character"
               value={characterAllowed}
               onChange={()=>{
                setCharacterAllowed((prev)=>!prev)
               }}
                />
              Character{characterAllowed}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
