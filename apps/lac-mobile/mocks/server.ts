import "fast-text-encoding";
import { setupServer } from "msw/native";
import "react-native-url-polyfill/auto";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
