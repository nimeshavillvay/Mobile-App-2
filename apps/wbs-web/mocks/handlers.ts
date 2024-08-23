import { API_BASE_URL } from "@/_lib/constants";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${API_BASE_URL}/rest/auth/login`, async ({ request }) => {
    const body = await request.json();
    const { userName, password } = body as {
      userName: string;
      password: string;
    };

    if (userName === "testuser" && password === "testpass") {
      return HttpResponse.json(
        {
          status_code: "200",
          user_id: 123,
          authentication: {
            authorities: [
              {
                authority: "ROLE_USER",
              },
            ],
            name: "John Doe",
          },
          change_password: false,
          is_sales_rep: true,
        },
        { status: 200 },
      );
    } else if (userName === "testuser" && password === "testwrong") {
      // Return an error response for invalid credentials
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message:
            "You have failed to login. This could be due to an incorrect Email or Password.",
        },
        { status: 401 },
      );
    } else {
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message: "Sign in unsuccessful. Please try again",
        },
        { status: 500 },
      );
    }
  }),
];
