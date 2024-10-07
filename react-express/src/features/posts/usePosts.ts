import { useEffect, useState } from "react";
import axiosIntence from "../../libs/axios";
import { PostsResponse } from "../../types/Types";

export const usePosts = () => {
    const [state, setState] = useState<Omit<PostsResponse, 'mutate'>>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: '',
    });

    useEffect(() => {
        axiosIntence.get('/posts').then((response) => {
            setState({
                data: response.data,
                loading: false,
                error: null,
                message: response.data.message,
                status: response.data.status
            })
        }
    ).catch(error =>
        setState(prev => ({
            ...prev,
            loading: false,
            error: error instanceof Error ? error : new Error('An unknown error occurred'),
        }))
    )

    }, [])

    return {
        ...state,
    }
}