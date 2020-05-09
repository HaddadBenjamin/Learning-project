class Errors
{
    public getErrorMessage(error: any) : string
    {
        const status = error.response.status || '';
        const statusText = error.response.statusText || '';
        const message = error.response.data || '';

        return `${status} : ${statusText} - ${message}.`;
    }
}

const errors: Errors = new Errors();

export default errors;