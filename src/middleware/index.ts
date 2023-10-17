import { getUserBySessionToken } from 'db/users'
import express from 'express'
import { merge, get } from "lodash";



export const isAuthenticated = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANTONIO-AUTH']
        
        if(!sessionToken){
            return res.sendStatus(403)
        }

        const existUser = await getUserBySessionToken(sessionToken)

        if (!existUser) {
          return res.sendStatus(403);
        }

         merge(req, { identity: existUser });

         return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isOwner =async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const currentUserId = get(req, "identity._id") as string;

      if (!currentUserId) {
        return res.sendStatus(400);
      }

      if (currentUserId.toString() !== id) {
        return res.sendStatus(403);
      }

      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}