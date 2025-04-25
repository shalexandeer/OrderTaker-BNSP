import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-in.tsx")).default,
    }),
  },
  {
    path: "/sign-up",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-up")).default,
    }),
  },
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("./pages/auth/forgot-password")).default,
    }),
  },
  {
    path: "/otp",
    lazy: async () => ({
      Component: (await import("./pages/auth/otp")).default,
    }),
  },
  {
    path: "/",
    lazy: async () => {
      const AuthGuard = await import("./provider/AuthGuard");
      return { Component: AuthGuard.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },
      {
        path: "referrals",
        lazy: async () => ({
          Component: (await import("@/pages/referral")).default,
        }),
      },
      {
        path: "meja",
        lazy: async () => ({
          Component: (await import("@/pages/meja")).default,
        }),
      },
      {
        path: "events",
        lazy: async () => ({
          Component: (await import("@/pages/events")).default,
        }),
      },
      {
        path: "events/add",
        lazy: async () => ({
          Component: (await import("@/pages/events/pages/EventAdd.tsx"))
            .default,
        }),
      },
      {
        path: "events/edit/:id",
        lazy: async () => ({
          Component: (await import("@/pages/events/pages/EventEdit.tsx"))
            .default,
        }),
      },
      {
        path: "vouchers",
        lazy: async () => ({
          Component: (await import("@/pages/voucher")).default,
        }),
      },
      {
        path: "chats",
        lazy: async () => ({
          Component: (await import("@/pages/chats")).default,
        }),
      },
      {
        path: "shop",
        lazy: async () => ({
          Component: (await import("@/pages/shop")).default,
        }),
      },
      {
        path: "users",
        lazy: async () => ({
          Component: (await import("@/pages/users")).default,
        }),
      },
      {
        path: "blocked-username",
        lazy: async () => ({
          Component: (await import("@/pages/blocked-username")).default,
        }),
      },
      {
        path: "game-client",
        lazy: async () => ({
          Component: (await import("@/pages/client-url")).default,
        }),
      },
      {
        path: "analysis",
        lazy: async () => ({
          Component: (await import("@/components/coming-soon")).default,
        }),
      },
      {
        path: "extra-components",
        lazy: async () => ({
          Component: (await import("@/pages/extra-components")).default,
        }),
      },
      {
        path: "settings",
        lazy: async () => ({
          Component: (await import("./pages/settings")).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/settings/profile")).default,
            }),
          },
          {
            path: "account",
            lazy: async () => ({
              Component: (await import("./pages/settings/account")).default,
            }),
          },
          {
            path: "appearance",
            lazy: async () => ({
              Component: (await import("./pages/settings/appearance")).default,
            }),
          },
          {
            path: "notifications",
            lazy: async () => ({
              Component: (await import("./pages/settings/notifications"))
                .default,
            }),
          },
          {
            path: "display",
            lazy: async () => ({
              Component: (await import("./pages/settings/display")).default,
            }),
          },
          {
            path: "error-example",
            lazy: async () => ({
              Component: (await import("./pages/settings/error-example"))
                .default,
            }),
            errorElement: <GeneralError className="h-[50svh]" minimal />,
          },
        ],
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
