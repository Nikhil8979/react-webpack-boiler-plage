import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./App";

const ReactDom = createRoot(document.querySelector("#app"))
ReactDom.render(<App/>)
