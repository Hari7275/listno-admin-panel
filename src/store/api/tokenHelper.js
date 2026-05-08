import { store } from "../index";

export const getAdminToken = () => {
  const token = store.getState().auth.token;
  return token ? `Bearer ${token}` : "";
};
