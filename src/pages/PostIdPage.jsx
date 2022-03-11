import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import PostService  from "../API/PostService";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [ comments, setComments] = useState({});
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setPost(response.data);
    })

    useEffect(() =>{
        fetchPostById(params.id)
    },[])
    return (
        <div>
            <h1>You opened the post page ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                :<div>{post.id}. {post.title}</div>
            }
            <h1>Comment</h1>
        </div>
    );
};

export default PostIdPage;