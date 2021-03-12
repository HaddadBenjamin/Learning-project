import useIncrement from './useIncrement'
import { renderHook, act } from '@testing-library/react-hooks'

it("should increment of the value of defined step", () =>
{
    // Arrange
    const { value, step } = { value : 0, step : 2 }
    const { result } = renderHook(() => useIncrement(value, step))
    const expectedValue : number = value + step

    // Act
    act(() => result.current.increment())

    expect(result.current.value).toBe(expectedValue)
})