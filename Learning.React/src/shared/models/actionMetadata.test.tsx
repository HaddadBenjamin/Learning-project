import { failedActionMetadataByErrorMessage, loadedActionMetadata, loadingActionMetadata } from './actionMetadata'
import ActionStatus from './actionStatus'

it("loadedActionMetadata should set status to loaded and error message to null", () =>
    // Act & Assert
    expect(loadedActionMetadata).toEqual({ status : ActionStatus.Loaded, errorMessage : null } ))

it("loadingActionMetadata should set status to loading and error message to null", () =>
    // Act & Assert
    expect(loadingActionMetadata).toEqual({ status : ActionStatus.Loading, errorMessage : null }))

it("failedActionMetadataByErrorMessage should set status to failed and error message", () =>
    // Act & Assert
    expect(failedActionMetadataByErrorMessage('message')).toEqual({ status : ActionStatus.Failed, errorMessage : 'message' }))