import React from 'react'
import { toast } from 'react-toastify';

const BlogCard = ({blog, blogs, setBlogs}) => {
    const showImage = (img) => {
       return (img) ? 'http://localhost:8000/uploads/blogs/'+img : 'https://placehold.co/600x400';
    }

    const deleteBlog = async (id) => {
        if(confirm("Are you sure you want to delete"))
        {
            const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
                method: "DELETE"
            });

            const newBlogs = blogs.filter((blog) => blog.id != id);
            setBlogs(newBlogs);

            toast("Blog Deleted Successfully");
        }
    }
  return (
        <div className="col-12 col-md-2 col-lg-3 mb-4">
            <div className="card border-0 shadow-lg">
                <img src={showImage(blog.image)} alt="blg-image" className='card-img-top'/>
                <div className="card-body">
                    <h2 className='h5'>{blog.title}</h2>
                    <p>{blog.shortDesc}</p>
                    <div className="d-flex justify-content-between">
                        <a href={`/blog/${blog.id}`} className='btn btn-dark'>Details</a>
                        <div>
                            <a href="#" className='text-danger' onClick={() => deleteBlog(blog.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                </svg>
                            </a>
                            <a href={`/blog/edit/${blog.id}`} className='text-success ms-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
