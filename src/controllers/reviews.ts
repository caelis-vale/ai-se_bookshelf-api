 import type { Request, Response } from 'express';
 import Review from '../models/review.js';
 import mongoose from 'mongoose';

 export const createReview = async (req: Request, res: Response) => {
    const { text, rating, bookId } = req.body;
    const review = await Review.create({ text, rating, book: bookId });
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        res.status(400).send({message: 'Invalid ID'})
    };
    res.status(201).send(review);
 };

 export const getReviews = async (req: Request, res: Response) => {
   const reviews = await Review.find({}).populate('book');
    res.status(200).send(reviews);
 };