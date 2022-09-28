import axios from 'axios';
import { useState, useEffect } from 'react'

export const useFetch = () => {
  const [comments, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://y4nzz-fullstack.onrender.com/api/comments');
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  return { comments, loading, error };
};