import {placeGetAllAction} from "./controller/PlaceGetAllAction";
import {placeGetByIdAction} from "./controller/PlaceGetByIdAction";
import {reviewSaveAction} from "./controller/ReviewSaveAction";
import {reviewGetAllAction} from "./controller/ReviewGetAllAction";
import {placePostAction} from "./controller/PlacePostAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/api/places",
        method: "get",
        action: placeGetAllAction
    },
    {
        path: "/api/myPlace",
        method: "post",
        action: placePostAction
    },
    {
        path: "/api/getReviews",
        method: "get",
        action: reviewGetAllAction
    },
    {
        path: "/api/places/:id",
        method: "get",
        action: placeGetByIdAction
    },
    {
        path: "/api/reviews",
        method: "post",
        action: reviewSaveAction
    }
];