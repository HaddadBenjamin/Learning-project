export enum SuggestionActionTypes
{
    GET_ALL_SUGGESTIONS = 'suggestions/getall',
}

export interface IGetAllSuggestionsAction
{
    type: SuggestionActionTypes.GET_ALL_SUGGESTIONS;
}
export type ApplicationAction = IGetAllSuggestionsAction;