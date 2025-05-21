import { useState, useRef } from "react";
import ButtonIcon from "./ButtonIcon";

interface InputProps {
    labelName: string;
    labelFor: string;
    inputType: string;
    inputName: string;
    getInputValue: (data: {name: string, value: string}) => void;
    isSentForm: boolean;
    error: string;
}

export function Popover({ value }: { value: string }) {

    const pswChecks = [
        {text:'min length 6', isChecked: value.length >= 6},
        {text:'at least 1 special ch', isChecked: /[^a-zA-Z0-9\s]/.test(value)},
        {text:'at least 1 number', isChecked: /\d/.test(value)}
    ]

    return (
        <div className="popover size-fit opacity-0 transition-all absolute right-5 bottom-5 text-sm p-2 whitespace-nowrap">
            {pswChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-1"><span><ButtonIcon iconType={check.isChecked ? 'check' : 'miss'}/></span> {check.text}</div>
            ))}
        </div>
)
}

export default function Input({labelName, labelFor, inputType, inputName, getInputValue, isSentForm, error}: InputProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [type, setType] = useState<string>(inputType);

    const customInput = useRef<HTMLInputElement>(null);

    const getValue = () => {
        const input = customInput.current;
        
        if (input) {
            getInputValue({name: input.name, value: input.value});
            setValue(input.value);

        }
    }

    return (
        <div className="relative">
            <label className={`absolute text-sm rounded-sm left-2 transition-transform duration-500 ${!isSelected && value.length < 1 ? 'top-1/2 -translate-y-1/2 px-1' : '-top-1/3 bg-zinc-800 px-3 sm:text-base'}`} htmlFor={labelFor}>{labelName}<span className={`${error && isSentForm ? 'text-red-500' : 'text-inherit'}`}>*</span></label>
            <input ref={customInput} className={`w-full pl-3 ${inputName.includes('password') ? 'pr-10' : 'pr-3'} py-2 border-1 border-[#ffffff80] focus:border-white rounded-md outline-none`} type={type} name={inputName} id={labelFor} onFocus={() => setIsSelected(true)} onBlur={() => setIsSelected(false)} onChange={getValue}/>
            {inputName.includes('password') &&
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button aria-label="password visible"onClick={() => setType(type === 'password' ? 'text' : 'password')} className="w-fit">
                    <ButtonIcon iconType={type}/>
                </button>
                {inputName === 'signup_password_field' &&
                <>
                    <button aria-label="password info" className="w-fit rounded-xs" id="passwordInfo">
                        <ButtonIcon iconType="info"/>
                    </button>
                    <Popover value={value}/>
                </>
                }

            </div>
            }
            {(isSentForm && error) && <div className="absolute -bottom-5 left-0 text-sm"><span className={`text-red-500`}>*</span>{error}</div>}
        </div>
    )
}