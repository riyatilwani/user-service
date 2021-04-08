import { HTTP400Error } from './../errors/http-400-error';
import { LoginRequest } from "../models/pojos/loginrequest";
import { BaseUser, User } from "../models/user.interface";
import { validateParams } from '../util/validate';

// In memory store
let activeUsers: User[] = [];

const validationParams = [
    {
        paramKey: 'username',
        required: true,
        type: 'string'
    },
    {
        paramKey: 'password',
        required: true,
        type: 'string',
        validatorFunctions: [(param: string) => { return (/^.{6,}$/.test(param)) }]
    },
    {
        paramKey: 'firstName',
        required: true,
        type: 'string',
    },
    {
        paramKey: 'lastName',
        required: true,
        type: 'string',
    },
    {
        paramKey: 'mobile',
        required: true,
        type: 'number',
        validatorFunctions: [(param: string) => { return (/^\d{10}$/.test(param)) }]
    }
];

const find = async (username: string): Promise<User> => activeUsers.find(user => user.username === username);

export const uploadUsers = async (userlist: BaseUser[]): Promise<User[]> => {
    const onboardingUsers: User[] = [];
    userlist.forEach(userObj => {
        validateParams(userObj, validationParams);
        const newUser: User = {
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            mobile: userObj.mobile,
            password: userObj.password,
            username: userObj.username,
            isActive: true,
        };
        onboardingUsers.push(newUser);
    });
    if (onboardingUsers.length > 0) activeUsers = activeUsers.concat(onboardingUsers);
    return onboardingUsers;
};

export const login = async (loginRequest: LoginRequest): Promise<User> => {
    const user: User = await find(loginRequest.username);
    if (!user) throw new HTTP400Error('This user does not exist');
    if (loginRequest.password !== user.password) throw new HTTP400Error('Incorrect password');
    if (!user.isActive) throw new HTTP400Error('User is inactive');
    return user;
};