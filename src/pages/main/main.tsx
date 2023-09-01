import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './post';

export interface Post {
    id: string;
    userName: string;
    userId: string;
    title: string;
    content: string;
}
export const Main = () => {
    const [postsList, setPostList] = useState<Post[] | null >(null);
    const postsRef = collection(db, 'posts');

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);{/* Eğer data nasıl gelecek bilmiyorsan cast kullan */}
    }

    useEffect(() => {
        getPosts();
    }, []);
    return(
        <div>
            {postsList?.map((post) => 
                <Post post={post}/>
            )}
        </div>
    )
}