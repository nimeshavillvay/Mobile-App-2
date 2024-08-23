import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";
import "whatwg-fetch";

Object.assign(global, { TextDecoder, TextEncoder });
