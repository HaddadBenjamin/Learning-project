import ActionStatus from './actionStatus'

export default interface IActionMetadata
{
    status : ActionStatus
    errorMessage : string | null
}