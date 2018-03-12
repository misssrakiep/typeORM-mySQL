import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Place} from "../entity/Places";

/**
 * Saves given post.
 */
export async function placePostAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const myPlaceRepository = getManager().getRepository(Place);

    // create a real post object from post json object sent over http
    const newPlace = myPlaceRepository.create(request.body);

    // save received post
    await myPlaceRepository.save(newPlace);

    // return saved post back
    response.send(newPlace);
}