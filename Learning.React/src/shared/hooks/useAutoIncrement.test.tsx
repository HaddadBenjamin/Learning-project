import useAutoIncrement from './useAutoIncrement'
import { renderHook } from '@testing-library/react-hooks'
import { sleep } from '../helpers/jsHelpers'

it("should increment of the value of defined step", () =>
{
    // Arrange
    const { value, step, delay } = { value : 0, step : 2, delay : 5 }
    const { result } = renderHook(() => useAutoIncrement(value, step, delay))
    const expectedValue : number = value + step

    // Act & Assert
    sleep(delay).then(() => expect(result.current).toBe(expectedValue))
})