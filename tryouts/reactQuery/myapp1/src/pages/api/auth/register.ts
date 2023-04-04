import { NextApiRequest, NextApiResponse } from 'next';
import {assert, StructError} from 'superstruct';
import { registerInpValidator } from '@/libs/validators';


export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            try {
                const { username, password, confirm, firstname, lastname, country } = req.body;
                // Validating fields
                assert({ username, password, confirm, firstname, lastname, country }, registerInpValidator);

                return res.json({ msg: "This is register route" });
            } catch (error) {
                if (error instanceof StructError){
                    // define a parser to parse values from failed-object
                    console.log(error.failures())
                    return res.status(400).json({error: "Invalid values"})
                }
                // console.log(error)
                return res.status(500).json({ error: "Internal error happened" })
            }
        default:
            return res.status(404).json({ error: "Requested method doesn't exist" });
    }

}