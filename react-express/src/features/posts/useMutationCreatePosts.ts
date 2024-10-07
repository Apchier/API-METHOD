import { useState } from "react";
import { PostsResponse } from "../../types/Types";
import axiosInstance from "../../libs/axios";

export const useCreatePosts = () => {
    const [state, setState] = useState<Omit<PostsResponse, "mutate">>({
        data: null,
        error: null,
        loading: false,
        message: "",
        status: "",
    });

    const mutate = async (content: string) => {
        setState(prev => ({ ...prev, loading: true }))
        try {
            const response = await axiosInstance.post('/posts', { content })
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null,
                message: response.data.message,
                status: response.data.status,
            }))

        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('An unknown error occurred'),
            }))

        }

        return {
            ...state,
            mutate
        }
    }

    return {
        ...state,
        mutate
    }
}
