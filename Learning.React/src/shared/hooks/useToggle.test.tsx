import useToggle from './useToggle'
import { renderHook, act } from '@testing-library/react-hooks'

it("Should invert the boolean value on toggle", () =>
{
    // Arrange
    const initialValue : boolean = true
    const expectedValue : boolean = false
    const { result } = renderHook(() => useToggle(initialValue))

    // Act
    act(() => result.current.toggle())

    // Assert
    expect(result.current.value).toBe(expectedValue)
})