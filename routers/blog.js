import express from 'express'
import {getAllBlogs,createBlog,deleteSelectData,updBlogs,authBlog} from '../controller/BlogController.js';
import getAuth from '../middleware/auth.js';

const blogRoute = express.Router();

blogRoute.get('/allblogs',getAuth, getAllBlogs);
blogRoute.post('/create',getAuth, createBlog);
blogRoute.delete('/delete/:id',getAuth, deleteSelectData);
blogRoute.put('/update/:id',getAuth,updBlogs);
blogRoute.get('/:id',getAuth, authBlog); 

export default blogRoute;
