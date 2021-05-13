import React, { useContext } from 'react'

export const UserContext = React.createContext()
export const initialUserState = {
    firstName : "John",
    lastName : "Doe"
};

export default function MyContextConsumer()
{
    const { firstName, lastName } = useContext(UserContext)

    return (
        <>
            <br></br><br></br>
            <h2>Les contextes</h2>
            <p>Welcome {firstName} {lastName}!</p>
        </>
    );
}