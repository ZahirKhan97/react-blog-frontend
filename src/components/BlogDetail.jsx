import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    
        const [blog, setBlog] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        const params = useParams();

        const fetchBlog = async () => {
            try 
            {
                setLoading(true);
                const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
                console.log(res);

                if (!res.ok) {
                    throw new Error('Failed to fetch blog details');
                }

                const result = await res.json();
                setBlog(result.data);
            } 
            catch (err) 
            {
                setError(err.message);
            } 
            finally 
            {
                setLoading(false);
            }
        }

    useEffect(() => {
        fetchBlog();
    },[params.id]);

    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!blog) {
        return <div>No blog found</div>;
    }

  return (
    <div className="container">
        <div className="d-flex justify-content-between pt-5 pb-4">
          <h4>{blog.title}</h4>
          <div>
            <a href="/" className='btn btn-dark'>Back To Blogs</a>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <p>by <strong>{blog.author}</strong> on {blog.date}</p>
                {
                    (blog.image) && <img className='w-100' src={`http://localhost:8000/uploads/blogs/${blog.image}`}/>
                }
                <div className='mt-5' dangerouslySetInnerHTML={{ __html: blog.description }}></div>
            </div>
        </div>
      </div>
  )
}

export default BlogDetail