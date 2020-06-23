import React from "react"
import useAutoIncrement from "../../shared/hooks/useAutoIncrement";

const CompteurAutoIncrement = () =>
{
    const value = useAutoIncrement()

    return <>
        Value : {value}
    </>
}

export default CompteurAutoIncrement