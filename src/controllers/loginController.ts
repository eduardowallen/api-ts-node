import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser';
import { UserModel } from '../models/userModel';
import ejs from 'ejs'
declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}
const users: IUser[] = [
  { name: 'john', email: 'john@example.com', password: 'hello' },
  { name: 'jane', email: 'jane@example.com', password: 'world' },
];
class LoginController
{
    public getLogin = (req: Request, res: Response) => {
        console.log("getLogin!")
        ejs.renderFile('src/views/login/login.ejs', { errors: [] }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html);
            }
        })
    }
    
    public postLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const errors = [];
        if (!email) {
            errors.push('Please enter an email');
        }
        if (!password) {
            errors.push('Please enter a password');
        }

        // Retrieve user from database
        const userModel = new UserModel();
        const user = await userModel.getUserByEmailAndPassword(email, password);
        console.log("user", user);
        if (!user) {
            errors.push('Cannot find user with that email and password');
        }
        if (errors.length > 0) {
            ejs.renderFile('src/views/login/login.ejs', { errors }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html);
            }
            });
        } else {
            req.session.user = user ?? undefined;
            ejs.renderFile('src/views/home/dashboard.ejs', { user: user }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html);
            }
            });
        }
    }
}

export default LoginController