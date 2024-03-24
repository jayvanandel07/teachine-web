import { useState } from "react";
import axios, { AxiosError, AxiosResponse, Method } from "axios";

interface AxiosHookResult<T> {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    sendRequest: (url: string, method?: Method, body?: any) => Promise<void>;
}

function useAxios<T>(): AxiosHookResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const sendRequest = async (
        url: string,
        method: Method = "GET",
        body?: any
    ) => {
        setLoading(true);
        try {
            const options: Record<string, any> = {
                method,
                url,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            if (body) {
                options.data = JSON.stringify(body);
            }
            const response: AxiosResponse<T> = await axios(options);
            setData(response.data);
        } catch (err: any) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, sendRequest };
}

export default useAxios;
