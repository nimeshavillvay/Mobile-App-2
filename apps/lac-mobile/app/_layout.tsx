import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY, SESSION_TOKEN_COOKIE } from "@/lib/constants";
import CookieManager from "@react-native-cookies/cookies";
import { getSession } from "@repo/shared-logic/apis/base/account/get-session";
import * as Sentry from "@sentry/react-native";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { isRunningInExpoGo } from "expo";
import { useFonts } from "expo-font";
import { useNavigationContainerRef } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

const DOMAIN = "https://wurthlac.com";

Sentry.init({
  dsn: "https://86baa557c3487f200ac62ad41ed5f791@o4507694849589248.ingest.us.sentry.io/4507694864400384",
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
    }),
  ],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
    },
  },
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  }),
});

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  const token = useSessionTokenStorage((state) => state.token);
  const setToken = useSessionTokenStorage((state) => state.setToken);

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    // Get the session token
    const getAndSetToken = async () => {
      const cookies = await CookieManager.get(DOMAIN);
      const tokenCookie = cookies[SESSION_TOKEN_COOKIE];

      const sessionResponse = await getSession({
        apiKey: API_KEY,
        baseUrl: API_BASE_URL,
        token: tokenCookie?.value,
      });

      let tokenValue = "";
      let expires = "";

      // Check for the session token cookie
      for (const header of sessionResponse.headers.entries()) {
        if (
          header[0] === "set-cookie" &&
          header[1].includes(`${SESSION_TOKEN_COOKIE}=`)
        ) {
          const keyValuePairs = header[1].split("; ");

          for (const pair of keyValuePairs) {
            const [key, value] = pair.split("=");

            if (key && value) {
              if (key === SESSION_TOKEN_COOKIE) {
                tokenValue = value;
              } else if (key === "expires") {
                expires = value;
              }
            }
          }
        }
      }

      if (tokenValue && expires) {
        CookieManager.set(DOMAIN, {
          name: SESSION_TOKEN_COOKIE,
          value: tokenValue,
          expires,
          path: "/",
        });

        setToken(tokenValue);
      }
    };

    getAndSetToken();
  }, [setToken]);

  useEffect(() => {
    // Hide the splash screen after both the session token and fonts have loaded
    if (token && loaded) {
      SplashScreen.hideAsync();
    }
  }, [token, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen
                name="search"
                options={{
                  presentation: "fullScreenModal",
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="barcode-scanner"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
};

// Wrap the Root Layout route component with `Sentry.wrap` to capture gesture info and profiling data.
export default Sentry.wrap(RootLayout);
