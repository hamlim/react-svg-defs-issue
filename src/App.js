import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import './App.css';

let numberOfMasks = 0;
let el = null;
const Mask /*: FunctionComponent<React.SVGProps<SVGMaskElement>> */ = ({children, ...props}) => {

  useEffect(() => {
    numberOfMasks++;
    if (numberOfMasks === 1) {
      console.log("add");
      const el = document.createElement("div");
      document.body.appendChild(el);
      ReactDOM.render(<svg><mask {...props}>{children}</mask></svg>, el);
    }

    return () => {
      numberOfMasks--;
      if (numberOfMasks === 0) {
        console.log("remove");
        ReactDOM.unmountComponentAtNode(el);
        document.body.removeChild(el);
        el = null;
      }
    };
  });
  return null;
};

const IconUsingDefs = () => (
  <svg height="50" width="50" viewBox = "0 0 100 100" version = "1.1">
    <defs>
        <circle id="circle" cx="50" cy = "50" r="50" />
    </defs>
    <g stroke="none" fill="none" fillRule="evenodd">
      <mask id="themask" fill="white">
        <use xlinkHref="#circle"></use>
      </mask>
      <g mask="url(#themask)" fill="red">
        <rect x="0" y="0" height="100" width="100"></rect>
      </g>
    </g>
  </svg>
);

const IconUsingDefs2 = () => (
  <svg height="50" width="50" viewBox = "0 0 100 100" version = "1.1">
    <defs>
        <circle id="circle2" cx="50" cy = "50" r="50" />
    </defs>
    <g stroke="none" fill="none" fillRule="evenodd">
      <Mask id="themask2" fill="white">
        <use xlinkHref="#circle2"></use>
      </Mask>
      <g mask="url(#themask2)" fill="red">
        <rect x="0" y="0" height="100" width="100"></rect>
      </g>
    </g>
  </svg>
);

function useInterval(ms) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCount(count => count + 1), ms);
    return () => clearInterval(interval);
  });
  return count;
}

function App() {
  const count = useInterval(1000);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Regular mask - Special mask
        </div>
        <div style={{display: count % 2 === 0 ? "none" : "block"}}>
          <IconUsingDefs />
          <IconUsingDefs2 />
        </div>
        <div>
          <IconUsingDefs />
          <IconUsingDefs2 />
        </div>
        <div>
          <IconUsingDefs />
          <IconUsingDefs2 />
        </div>
      </header>
    </div>
  );
}

export default App;
