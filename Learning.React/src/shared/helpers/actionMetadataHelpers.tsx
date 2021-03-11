import ActionStatus from '../models/actionStatus'
import IActionMetadata from '../models/actionMetadata'

export const loadedActionMetadata : IActionMetadata = { errorMessage : null, status : ActionStatus.Loaded }

export const loadingActionMetadata : IActionMetadata = { errorMessage : null, status : ActionStatus.Loading }

export const failedActionMetadataByAction = (action : any) : IActionMetadata => {
    return { errorMessage : action.payload.error.errorMessage, status : ActionStatus.Failed } }

export const failedActionMetadataByErrorMessage = (errorMessage : string) : IActionMetadata => {
    return { errorMessage : errorMessage, status : ActionStatus.Failed } }