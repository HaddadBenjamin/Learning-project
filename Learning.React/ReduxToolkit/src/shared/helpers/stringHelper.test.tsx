import { newGuid } from './stringHelpers'

it("newGuid should have be composed of 36 characters", () =>
    // Act & Assert
    expect(newGuid()).toHaveLength(36))