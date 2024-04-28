export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  EXISTS: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const STATUS_MESSAGES = {
  [STATUS_CODES.OK]: "OK",
  [STATUS_CODES.CREATED]: "Created",
  [STATUS_CODES.ACCEPTED]: "Accepted",
  [STATUS_CODES.NO_CONTENT]: "No Content",
  [STATUS_CODES.BAD_REQUEST]: "Bad Request",
  [STATUS_CODES.UNAUTHORIZED]: "Unauthorized",
  [STATUS_CODES.FORBIDDEN]: "Forbidden",
  [STATUS_CODES.NOT_FOUND]: "Not Found",
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: "Internal Server Error",
};
export const USER_TYPES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
};

export const SWEETALERT_MESSAGES = {
  SUCCESS: "Operation successful",
  ERROR: "An unexpected error occurred",
  LOGIN: "Successfully Logged In",
  INVALID_CREDENTIALS: "Invalid Email or Password",
  SERVER_ERROR: "Server Error",
  REQUIRED: "Please Fill Out All Fields",
  ATTACHMENTS: "Are you sure you want to delete attachments ?",
  CASE_SUBMIT: "Are you sure you want to submit Case Request ?",
  ADD_CATEGORY: "Are you sure you want to add this field?",
  CLOSE: "Close",
};

export const SWEETALERT_CONFIRM_MESSAGE = {
  ATTACHMENTS: "Attachment Deleted Successfully",
  CASE_SUBMIT: "Case Submitted Successfully",
  ADD_FIELD: "Field added successfully",
};

export const SWEETALERT_DENY_MESSAGE = {
  ATTACHMENTS: "Operation Denied",
};
export const SWEETALERT_TITLES = {
  SUCCESS: "Success",
  ERROR: "Error",
  WARNING: "Warning",
};

export const SWEETALERT_ICONS = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

