import { useState } from "react";
import { PostsResponse } from "../../types/Types";
import axiosInstance from "../../libs/axios";

export const useUpdatePosts = () => {
    const [state, setState] = useState<Omit<PostsResponse, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    const mutate = async (id: string, content: string) => {
        setState(prev => ({ ...prev, loading: true }))

        axiosInstance.put(`/posts/${id}`, { content }).then(response => {            
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null,
            }))
        }).catch(error => {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('An unknown error occurred'),
            }))
        })
    }

    return { 
        ...state,
        mutate
    }
}