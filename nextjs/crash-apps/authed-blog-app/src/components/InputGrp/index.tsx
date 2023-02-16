import { useDarkLight } from "@/context/darkLight"
import { Dispatch, SetStateAction } from "react"
import InputStyled from "../styled/InputStyled"
import TextAreaStyled from "../styled/TextArea"


type props<T> = {
    label: string,
    state: T,
    stateAction: Dispatch<SetStateAction<T>>,
    textarea?: boolean,
    size?: "full" | "half" | "mini",
    placeHolderText: string
}

function idFrmttr(str: string) {
    return str.toLowerCase().replace(/ /g, "_")
}

export default function InputGrp<T>({ label, state, stateAction, textarea = false, size = "full", placeHolderText }: props<T>) {

    const {isDark} = useDarkLight(); 

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "12px",
            width: "90%"
        }}>
            <label htmlFor={idFrmttr(label)}
                style={{
                    fontSize: "1.25rem",
                    lineHeight: "1.25rem",
                    fontWeight: "600",
                    color: isDark ? "#ffffff" : "#000"
                }}
            >{label.toUpperCase()}</label>
            {
                textarea ? (
                    <TextAreaStyled
                        id={idFrmttr(label)}
                        value={state as string} onChange={e =>
                            stateAction(e.target.value as any)}
                        placeholder={placeHolderText}
                        dark={isDark}
                    ></TextAreaStyled>
                ) : (
                    <InputStyled
                        type="text" id={idFrmttr(label)}
                        value={state as string}
                        onChange={e => stateAction(e.target.value as any)}
                        placeholder={placeHolderText}
                        dark={isDark}
                    />
                )
            }
        </div>
    )
}