import { deleteUser, getAllUsers, updateUsers } from "controllers/users";
import express from "express";
import { isAuthenticated, isOwner } from "middleware";

export default (router: express.Router) =>{
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUsers);
}