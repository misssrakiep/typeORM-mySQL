import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Place} from "../entity/Places";

/**
 * Loads all posts from the database.
 */
export async function placeGetAllAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const placeRepository = getManager().getRepository(Place);

    // load a post by a given post id
    const places = await placeRepository.find();

    // return loaded places
    response.send(places);
}