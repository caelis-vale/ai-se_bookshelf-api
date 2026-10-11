 import type { Request, Response } from 'express';
 import Book from '../models/book.js';
 import mongoose from 'mongoose';


export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.find({});
    res.send(books);
};

export const createBook = async (req: Request, res: Response) => {
    const { title, genre, year, tags } = req.body;
    const book = await Book.create({ title, genre, year, tags });
    res.status(201).send(book);
};

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log('Checking id:', id, mongoose.Types.ObjectId.isValid(String(id)));

    if (!mongoose.Types.ObjectId.isValid(String(id))){
        return res.status(400).send({ message: 'Invalid ID'})
    };
    const book = await Book.findById(req.params.id);
    res.send(book);
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(String(id))){
        return res.status(400).send({ message: 'Invalid ID'})
    };

    const book = await Book.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true, runValidators: true}
    );
    res.send(book);
};

export const deleteBook = async (req: Request, res: Response) => {
        const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(String(id))){
        return res.status(400).send({ message: 'Invalid ID'})
    };

    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).send({message: 'Not found' });
    }
    res.send(book);
}