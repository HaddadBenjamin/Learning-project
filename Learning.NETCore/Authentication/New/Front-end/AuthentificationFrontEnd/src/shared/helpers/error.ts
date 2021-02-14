class Errors
{
    public getErrorMessage(error: any) : string
    {
        if (error === undefined)
            return '';

        if (error.response === undefined)
            return JSON.stringify(error);

        const status = error.response.status || '';
        const statusText = error.response.statusText || '';
        const message = error.response.data || '';

        return `${status} : ${statusText} - ${message}.`;
    }
}

const errors: Errors = new Errors();

export default errors;