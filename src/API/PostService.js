import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        console.log(response, 'response')
        return response;
    }

    static async getById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        return response;
    }
    static async getCommentsByPostId() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/${id}/comments')
        return response;
    }
}
