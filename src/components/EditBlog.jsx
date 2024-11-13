import React, { useEffect, useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState(null);
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch blog data
    const fetchBlog = async () => {
        try {
            setLoading(true); // Set loading to true while fetching
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch blog');
            }
            const result = await res.json();
            setBlog(result.data);
            setHtml(result.data.description); // Initialize the HTML content in the editor
            reset(result.data); // Reset the form with fetched data
        } catch (err) {
            setError(err.message); // Set error if fetching fails
        } finally {
            setLoading(false); // Set loading to false after fetch is complete
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    // Handle HTML editor change
    function onChange(e) {
        setHtml(e.target.value);
    }

    // Handle image file change
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:8000/api/save-temp-image", {
            method: "POST",
            body: formData
        });

        const result = await res.json();
        if (result.status === false) {
            alert(result.errors.image);
            e.target.value = null; // Clear the file input if there's an error
        } else {
            setImageId(result.image.id); // Update the image ID
        }
    };

    // Handle form submission
    const formSubmit = async (data) => {
        const newData = { ...data, description: html, image_id: imageId };
        const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
            method: "PUT", // Use PUT to update the blog
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (res.ok) {
            toast("Blog Updated Successfully");
            navigate('/');
        } else {
            toast("Error updating the blog");
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>No blog found</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 pb-4">
                <h4>Edit Blog</h4>
                <a href="/" className='btn btn-dark'>Back</a>
            </div>
            <div className="card border-0 shadow-lg">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input
                                { ...register('title', { required: true }) }
                                type="text"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder='Enter Title' />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Short Description</label>
                            <textarea 
                                { ...register('shortDesc') }
                                className='form-control'
                                placeholder='Enter Short Description'
                                cols="30" rows="5"></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <Editor 
                                placeholder='Enter Description' 
                                value={html} 
                                onChange={onChange} 
                                containerProps={{ style: { height: '500px' } }} 
                            />
                        </div>
                        <div className="mb-3">
                            <div className='mb-3'>
                                { blog.image && 
                                    <img className='w-100' src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog Image" />
                                }
                            </div>
                            <label className='form-label'>Image</label>
                            <input onChange={handleFileChange} type="file" className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input 
                                { ...register('author', { required: true }) }
                                type="text" 
                                className={`form-control ${errors.author && 'is-invalid'}`} 
                                placeholder='Enter Author' />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button type='submit' className='btn btn-dark'>Update Blog</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
