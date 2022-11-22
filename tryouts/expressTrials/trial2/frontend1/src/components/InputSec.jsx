import { useEffect, useRef, useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import MyInput from '../styledComponents/MyInput';


const InputSec = ({ inputId, value, setValue, inputType = "text", valid, focusOnStart = false, err, info: Info, textArea = false, required = true, label, placeholder, hasError = true, hasInfo = true, hasValidIcon=true }) => {

    const ref = useRef();

    const [focus, setFocus] = useState(false);

    useEffect(() => {
        focusOnStart && ref.current.focus()
    }, [focusOnStart])

    return (
        <div className="input-sec">
            <label htmlFor={inputId}>
                <span>{label}</span>
                {hasValidIcon && (
                    focus ? <span>{valid ? <MdCheck className='icon' /> : <MdClose className='icon invalid' />} </span> : ""
                )}
            </label>
            <MyInput
                ref={ref}
                as={textArea ? "textarea" : "input"}
                textArea={textArea}
                type={inputType}
                id={inputId}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {hasError && <p className="input-error">{err}</p>}
            {hasInfo && (
                (!valid && focus) ? <div className="input-info">
                    <Info />
                </div> : ""
            )}
        </div>
    )
}

export default InputSec;