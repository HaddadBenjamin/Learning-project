import useCounter from './useCounter'
import { renderHook, act } from '@testing-library/react-hooks'
 
it("Increment should increment the value of step", () =>
{
    // Arrange
    const { value, step } = { value : 0, step : 2 }
    const { result } = renderHook(() => useCounter(value, step))
    const expectedValue : number = value + step

    // Act
    act(() => result.current.increment())

    // Assert
    expect(result.current.value).toBe(expectedValue)
})

it("Decrement should decrement the value of step", () =>
{
    // Arrange
    const { value, step } = { value : 0, step : 2 }
    const { result } = renderHook(() => useCounter(value, step))
    const expectedValue : number = value - step

    // Act
    act(() => result.current.decrement())

    // Assert
    expect(result.current.value).toBe(expectedValue)
})