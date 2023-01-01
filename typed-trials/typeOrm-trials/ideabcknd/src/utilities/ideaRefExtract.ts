import { Request } from "express";
import { isString } from "lodash";
import isURL from "validator/lib/isURL";

/**
 * 
 * @description if you pass the req object, it will extract and returns the ideaId from the referer head if i fails it will return false
 * @param req - request object of the RequestHandler object.
 * @returns ideaId(number)  ||  false (if failed)
 */

const ideaRefererHeadExtractor: (req: Request) => number | false = (req) => {
    const idea_path = req.headers.referer;

    if(!idea_path || !isString(idea_path)){
        return false;
    }

    if (!isURL(idea_path, { protocols: ["http", "https"], require_valid_protocol: true, host_whitelist: ["localhost"] })) {
        return false;
    }
    try {
        const idea_url: URL = new URL(idea_path);
        const idea_paths: Array<string> = idea_url.pathname.split("/");
        const idea_id: number = parseInt(idea_paths[idea_paths.length - 1])
        if (!idea_id) {
            return false
        }
        return idea_id;
    } catch (error) {
        return false;
    }
}

export default ideaRefererHeadExtractor;