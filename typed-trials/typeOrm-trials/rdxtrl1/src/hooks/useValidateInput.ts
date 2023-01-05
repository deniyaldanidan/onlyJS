import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type validOutType<A> = [A, Dispatch<SetStateAction<A>>, string|false];

/**
 * @param initialInp - initial input
 * @param errMsg - Message or information to show if validation is false
 * @param validateCB - validation callback
 * @returns - state, setState, stateErr(false, error-message)
 */
function useValidateInput<T>(initialInp: T, errMsg: string, validateCB: (inp: T) => boolean):[T, Dispatch<SetStateAction<T>>, string|false] {
    const [input, setInput] = useState<T>(initialInp);
    const [inpErr, setInpErr] = useState<string | false>(false);

    useEffect(() => {
        const validInp = validateCB(input);
        setInpErr(validInp ? false : errMsg)

    }, [input, errMsg, validateCB])

    return [input, setInput, inpErr];
}

export default useValidateInput;