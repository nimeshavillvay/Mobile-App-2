"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const Analytics = () => {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        // Enable analytics only on the production environment
        if (process.env.VERCEL_ENV !== "production") {
          return null;
        }

        return event;
      }}
    />
  );
};

export default Analytics;
