import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser';
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
        ejs.renderFile('src/views/login/login.ejs', { error: 'Invalid username or password' }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html);
            }
        })
    }
    
    public postLogin = (req: Request, res: Response) => {
        console.log('working post!')
        console.log(req.body)
        const { name, password } = req.body;
        const user = users.find((user) => user.name === name && user.password === password);
        if (user) {
            console.log('Logged in!')
            // Add a new console log here that displays the current time and user details
            console.log(new Date().toLocaleString(), user)
            req.session.user = user;
            ejs.renderFile('src/views/home/dashboard.ejs', { user }, (err, html) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(html);
                }
            })
        } else {
            ejs.renderFile('src/views/login/login.ejs', { error: 'Invalid username or password' }, (err, html) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(html);
                }
            })
        }
    }
}

export default LoginController