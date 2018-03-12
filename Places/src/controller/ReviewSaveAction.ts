import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Reviews} from "../entity/Reviews";

/**
 * Saves given post.
 */
export async function reviewSaveAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const reviewsRepository = getManager().getRepository(Reviews);

    // create a real post object from post json object sent over http
    const newReview = reviewsRepository.create(request.body);

    // save received post
    await reviewsRepository.save(newReview);

    // return saved post back
    response.send(newReview);
}