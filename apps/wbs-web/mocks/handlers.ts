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
          user_id: "123",
          authentication: {
            authorities: [
              {
                authority: "ROLE_USER",
              },
            ],
            name: "John Doe",
            change_password: false,
            is_sales_rep: true,
          },
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
  http.post(
    `${API_BASE_URL}/rest/register/check-username`,
    async ({ request }) => {
      const body = await request.json();
      const { userName } = body as {
        userName: string;
      };

      if (userName === "testuser") {
        return HttpResponse.json(
          {
            status_code: "OK",
          },
          { status: 200 },
        );
      }
      if (userName === "testuserexisting") {
        // Return an error response for invalid credentials
        return HttpResponse.json(
          {
            status_code: "FAILED",
            message: "User name address already exists in the database.",
          },
          { status: 400 },
        );
      }
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message: "User name check failed. Please try again",
        },
        { status: 500 },
      );
    },
  ),
  http.post(`${API_BASE_URL}/rest/register/existing`, async ({ request }) => {
    const body = await request.json();
    const { accountNo, documentId, userName, email } = body as {
      accountNo: string;
      documentId: string;
      userName: string;
      email: string;
    };

    // Simulate successful registration
    if (accountNo === "123456" && documentId === "DOC123") {
      return HttpResponse.json(
        {
          status_code: "OK",
          type: "USER",
          id: 123,
        },
        { status: 200 },
      );
    }

    // Simulate account/document mismatch
    if (accountNo === "11111" || documentId === "11111") {
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message: "Sorry, the account/document combination is invalid.",
        },
        { status: 400 },
      );
    }

    // Simulate existing username
    if (userName === "existinguser") {
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message:
            "Username already exists in the database! Please choose a different username.",
        },
        { status: 400 },
      );
    }

    // Simulate existing email
    if (email === "existing@example.com") {
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message:
            "Email address already exists in the database! Please Login to continue.",
        },
        { status: 400 },
      );
    }

    // Simulate server error
    if (accountNo === "22222") {
      return HttpResponse.json(
        {
          status_code: "FAILED",
          message: "An unexpected error occurred. Please try again later.",
        },
        { status: 500 },
      );
    }

    // Default case: unexpected input
    return HttpResponse.json(
      {
        status_code: "FAILED",
        message: "Invalid input data.",
      },
      { status: 400 },
    );
  }),
];
