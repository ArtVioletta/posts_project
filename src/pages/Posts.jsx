import React, {useEffect, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/pagination";


function Posts() {
    const [posts, setPosts] = useState()
    const [filter, setFilter] = useState({sort: "", query:""})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages (getPageCount(totalCount, limit));
    })

    useEffect(() => {
        (async () => {
            await fetchPosts(limit, page)
        })()
    }, [])




    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }



    const removePost = (post) => {
        const filteredPost = posts.filter(p => p.id !== post.id)
        setPosts(filteredPost)
    }

    const changePage = async (page) => {
        setPage(page)
        await fetchPosts(limit, page)
    }


    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
            <h1>An error has occurred ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}> <Loader/> </div>
                :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts"/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;