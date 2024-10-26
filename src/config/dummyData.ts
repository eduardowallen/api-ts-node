import { IUser } from '../interfaces/IUser'
const dummyNamesFirstname = [
    'John',
    'Jane',
    'Bob',
    'Alice',
    'Adam',
    'Eve',
    'Charlie',
    'David',
    'Erika',
    'Hans',
    'Ingrid',
    'Jens'
]
const dummyNamesSecondname = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Miller',
    'Davis',
    'Garcia',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez'
]
function getDummyName() {
    return dummyNamesFirstname[Math.floor(Math.random() * dummyNamesFirstname.length)] + ' ' + dummyNamesSecondname[Math.floor(Math.random() * dummyNamesSecondname.length)];
}

export function getDummyUser(): IUser {
    const dummyName = getDummyName();
    return {
        name: dummyName,
        email: `${dummyName.replace(' ', '.').toLowerCase()}@example.com`,
        password: 'password123',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    }
}

