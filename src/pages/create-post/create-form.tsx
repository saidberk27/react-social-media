import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './create-form.css'; // Import the CreateForm.css
import { useNavigate } from 'react-router-dom';

interface CreateFormData {
  title: string;
  content: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required('Gönderinin Başlığı Olmalı'),
    content: yup.string().required('Gönderinizin İçeriği Olmalı'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      title: data.title,
      content: data.content,
      userName: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <div className="create-form">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input className="input-field" placeholder="Başlık..." {...register('title')} />
        {errors.title && <p className="error-message">{errors.title.message}</p>}
        <textarea className="input-field" placeholder="İçerik..." {...register('content')} />
        {errors.content && <p className="error-message">{errors.content.message}</p>}
        <input type="submit" className="submit-button" value="Gönder" />
      </form>
    </div>
  );
};
