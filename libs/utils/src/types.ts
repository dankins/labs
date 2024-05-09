export type FormError = {
  status: "error";
  fieldErrors?: { [name: string]: { message: string } };
  message: string;
};

export type FormSuccess = {
  status: "success";
  message?: string;
  redirect?: string;
};

export type FormState = { status: "start" } | FormSuccess | FormError;

export type SearchParams = { [key: string]: string | string[] | undefined };
