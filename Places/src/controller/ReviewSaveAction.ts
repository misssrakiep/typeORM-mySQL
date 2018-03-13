import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {Reviews} from "../entity/Reviews";

/**
 * Saves given post.
 */
export async function reviewSaveAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const reviewsRepository = getRepository(Reviews);
    let data = request.body;
    console.log(data);
    
    // create a real post object from post json object sent over http
    const newReview = new Reviews();

    newReview.user_name = data.user_name;
    newReview.rating = data.rating;
    newReview.review = data.review;
    newReview.pictures = data.pictures;
    newReview.place = data.place;
    
    // save received post
    await reviewsRepository.save(newReview);

    // return saved post back
    response.send(newReview);
}