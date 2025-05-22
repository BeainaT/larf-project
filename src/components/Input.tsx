import { useState, useRef, useEffect } from "react";
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

export function Popover({ value, isActive = false, getInfoStatus }: { value: string, isActive?: boolean, getInfoStatus: (data:boolean) => void}) {

    const pswChecks = [
        {text:'six characters', isChecked: value.length >= 6},
        {text:'one special character (eg.$,%,?)', isChecked: /[^a-zA-Z0-9\s]/.test(value)},
        {text:'one number', isChecked: /\d/.test(value)}
    ]

    useEffect(() => {
        if (value) getInfoStatus(pswChecks.every(check => check.isChecked));
    },[value])

    return (
        <div className={`${isActive ? 'popover active' : 'popover'} size-fit opacity-0 transition-all absolute right-3 sm:right-5 bottom-6 text-sm p-2 whitespace-nowrap`}>
            <span className="text-xs">AT LEAST:</span>
            {pswChecks.map((check, i) => (
                <div key={i} className="flex items-center sm:gap-1"><span><ButtonIcon iconType={check.isChecked ? 'check' : 'miss'}/></span> {check.text}</div>
            ))}
        </div>
)
}

export default function Input({labelName, labelFor, inputType, inputName, getInputValue, isSentForm, error}: InputProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [type, setType] = useState<string>(inputType);
    const [isActivePopover, setIsActivePopover] = useState(false);
    const [infoColor, setInfoColor] = useState<string>('text-[#ffffff90]');

    const customInput = useRef<HTMLInputElement>(null);
    const input = customInput.current;

    const getValue = () => {
        
        if (input) {
            getInputValue({name: input.name, value: input.value});
            setValue(input.value);
        }
    }

    const handleInfoStatus = (isAllChecked:boolean) => {
        if (isAllChecked) setInfoColor('text-green-500');
        else setInfoColor('text-red-500')        
    }

    useEffect(() => {
        if (input && input.name === 'signup_password_field' && isSelected && !input.value.length) {
            setIsActivePopover(true);
            setInfoColor(('text-[#ffffff90]'));
        }
        else setIsActivePopover(false);
    },[isSelected, value])

    return (
        <div className={`relative input-container`}>
            <label className={`absolute text-sm rounded-sm left-2 transition-transform duration-500 ${!isSelected && value.length < 1 ? 'top-1/2 -translate-y-1/2 px-1' : '-top-1/3 bg-zinc-800 px-3 sm:text-base'}`} htmlFor={labelFor}>{labelName}<span className={`${error && isSentForm ? 'text-red-500' : 'text-inherit'}`}>*</span></label>
            <input ref={customInput} className={`w-full pl-3 ${inputName.includes('password') ? 'pr-16 sm:pr-20' : 'pr-3'} py-2 border-1 border-[#ffffff80] focus:border-white rounded-md outline-none`} type={type} name={inputName} id={labelFor} onFocus={() => setIsSelected(true)} onBlur={() => setIsSelected(false)} onChange={getValue} autoComplete="off"/>
            {inputName.includes('password') &&
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button type="button" aria-label="password visibility" onClick={() => setType(type === 'password' ? 'text' : 'password')} className="w-fit rounded-sm">
                    <ButtonIcon iconType={type}/>
                </button>
                {inputName === 'signup_password_field' &&
                <>
                    <button type="button" aria-label="password info" className="w-fit info-btn rounded-sm" id="passwordInfo">
                        <ButtonIcon iconType="info" customClass={infoColor}/>
                    </button>
                    <Popover isActive={isActivePopover} value={value} getInfoStatus={handleInfoStatus}/>
                </>
                }

            </div>
            }
            {(isSentForm && error) && <div className="absolute -bottom-5 left-0 text-xs uppercase"><span className={`text-red-500 align-middle`}>*</span> {error}</div>}
        </div>
    )
}