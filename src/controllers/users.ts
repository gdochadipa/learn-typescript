import { deleteUserById, getUser, getUserById } from 'db/users'
import express from 'express'

export const getAllUsers = async (req: express.Request, res: express.Response) =>{
    try {
        const users = await getUser();

        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
        try{
            const {id} = req.params

            const deleteUser = await deleteUserById(id);

            return res.json(deleteUser);
        }catch(error){
            console.log(error);
            return res.sendStatus(400)
            
        }
}

export const updateUsers = async (req: express.Request, res : express.Response) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) {
        return res.sendStatus(400);
      }

      const user = await getUserById(id);

      user.username = username;

      await user.save();

      return res.status(400).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}