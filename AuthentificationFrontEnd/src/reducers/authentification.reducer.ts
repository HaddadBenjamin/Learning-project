export interface IAuthentificationState
{
    errorMessage? : string,
    isAuthentified : boolean,
    username? : string,
    email? : string,
}

export const authentificationInitialState : IAuthentificationState =
{
    errorMessage : undefined,
    isAuthentified : false,
    username : undefined,
    email : undefined
};