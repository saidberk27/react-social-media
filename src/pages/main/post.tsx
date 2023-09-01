import { addDoc, getDocs, collection, query, where, getDoc } from "firebase/firestore";
import { Post as Ipost} from "./main";
import './post.css'
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
    post: Ipost;
}

interface Like{
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const[likes, setLike] = useState<Like[] | null>(null);
    const likesRef = collection(db, 'likes');
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const likeData = await getDocs(likesDoc);
        setLike(likeData.docs.map((doc) => ({ userId: doc.data().userId })));
    }

    const addLike = async () => {
      await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
      });
      getLikes();

    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    useEffect(() => {
        getLikes();
    }, []);
    return( 
      <div className="post-div">
        <div className="post-title">
            <h1> {post.title} </h1>
        </div>

        <div className = "post-body">
            <p> {post.content} </p>    
        </div>

        <div className="post-footer">
            <p>@{post.userName}</p>
            {likes && <p> { likes?.length } Beğeni </p>}
            <button onClick={addLike}>{hasUserLiked? <>&#128148;</> : <>&#10084;</> }</button>
        </div>  
      </div>
    )
}