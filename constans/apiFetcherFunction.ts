import axios from "axios";

export const getFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

export const postFetcher = async <TData = unknown, TResponse = unknown>(
  url: string,
  { arg }: { arg: TData },
): Promise<TResponse> => {
  const res = await axios.post<TResponse>(url, arg);
  return res.data;
};

export const putFetcher = async <TData = unknown, TResponse = unknown>(
  url: string,
  { arg }: { arg: TData },
): Promise<TResponse> => {
  const res = await axios.put<TResponse>(url, arg);
  return res.data;
};

export const patchFetcher = async <TData = unknown, TResponse = unknown>(
  url: string,
  { arg }: { arg: TData },
): Promise<TResponse> => {
  const res = await axios.patch<TResponse>(url, arg);
  return res.data;
};
