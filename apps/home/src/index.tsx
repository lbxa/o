/* @refresh reload */
import "./index.css";

import type { MountableElement } from "solid-js/web";
import { render } from "solid-js/web";

import { App } from "./App";

const root = document.getElementById("root") as MountableElement;

render(() => <App />, root);
