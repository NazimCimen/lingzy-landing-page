export const APP_ROUTES = {
  DASHBOARD: {
    OVERVIEW: "/dashboard",
    MINI_READINGS: "/dashboard/mini-readings",
    WORLD_CLASSICS: "/dashboard/world-classics",
    USERS: "/dashboard/users",
    NOTIFICATIONS: "/dashboard/notifications",
    LOGIN: "/dashboard/login",
  },
} as const;

export const AUTH = {
  COOKIE_NAME: "lingzy_session",
  SESSION_DURATION: 24 * 60 * 60 * 1000, 
  SECRET_FALLBACK: "lingzy_fallback_secret_for_development_only_123",
} as const;

export const MESSAGES = {
  ERRORS: {
    INVALID_CREDENTIALS: "Invalid username or password.",
    FETCH_FAILED: "Failed to fetch data.",
    DELETE_FAILED: "Could not safely delete the item.",
    SERVER_ERROR: "An unexpected error occurred.",
  },
  SUCCESS: {
    ITEM_SAVED: "Item has been successfully saved.",
    ITEM_DELETED: "Item has been successfully deleted.",
  },
} as const;
