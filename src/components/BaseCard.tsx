import { useEffect, useState, type FormEvent } from "react"
import Input from "./Input";

type MyComponentProps = {
    toggleWiew: (data: boolean) => void;
    responseForm: (data: boolean) => void;
};
type FormData = {
    signin_email_field: string;
    signin_password_field: string;
    signup_name_field: string;
    signup_email_field: string;
    signup_password_field: string;
    signup_password_check_field: string;
}

export default function BaseCard({toggleWiew, responseForm}: MyComponentProps) {
    const [isSigninView, setIsSigninView] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormData>({
        signin_email_field: '',
        signin_password_field: '',
        signup_name_field: '',
        signup_email_field: '',
        signup_password_field: '',
        signup_password_check_field: ''
    });
    const [formErrors, setFormErrors] = useState<FormData>({
        signin_email_field: '',
        signin_password_field: '',
        signup_name_field: '',
        signup_email_field: '',
        signup_password_field: '',
        signup_password_check_field: ''
    });
    const [successForm, setSuccessForm] = useState<boolean>(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);


    const handleClick = () => {
        setIsSigninView(!isSigninView);
        toggleWiew(!isSigninView);
        setIsFormSubmitted(false);
    }

    const handleInputValue = (data: {name: string, value: string}) => {
        const key = data.name;
        const value = data.value;
        setFormData({...formData, [key]: value});
    }

    const checkFormErrors = (signinView: boolean) => {
        return signinView ? formErrors.signin_email_field || formErrors.signin_password_field :
        formErrors.signup_name_field || formErrors.signup_email_field || formErrors.signup_password_field || formErrors.signup_password_check_field
    }

    const resForm = (e: FormEvent) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        const errors = checkFormErrors(isSigninView);
        
        if (!errors) {
            setSuccessForm(true);
            responseForm(true);
        }
    }

    const validateForm = () => {
        //BASE TEST CHECK TO VALIDATE --WIP
        const errors: Record<string, string> = {};
        for (const key in formData) {
            const typedKey = key as keyof FormData
            if (formData[typedKey].trim() === '') errors[typedKey] = 'required field';
            else errors[typedKey] = '';         
        }
        if (formData.signin_email_field && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.signin_email_field)) errors.signin_email_field = 'not valid email';
        if (formData.signup_email_field && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.signup_email_field)) errors.signup_email_field = 'not valid email';
        if (formData.signup_password_field.length < 6 || !/[^a-zA-Z0-9\s]/.test(formData.signup_password_field) || !/\d/.test(formData.signup_password_field)) {
            errors.signup_password_field = 'check out info';
        }
        if (formData.signup_password_check_field && formData.signup_password_check_field !== formData.signup_password_field) {
            errors.signup_password_check_field = 'passwords don\'t match';
            errors.signup_password_field = 'passwords don\'t match';
        }
        return errors;
    }

    useEffect(() => {
        const errors = validateForm();
        setFormErrors({...formErrors, ...errors});
        
        
    },[formData])

    return (
        <>
            <div className={`base-card w-full h-full border-2 rounded-xl p-6 sm:p-8 overflow-hidden ${!isSigninView ? 'rotate-y-180' : ''} ${successForm ? `rotate-x-90 transition-transform duration-1000 ease-in-out` : ''}`}>
                <div className="-z-10 overlay absolute top-0 left-0 right-0 bottom-0 rounded-tr-[150px] sm:rounded-tr-[200px] border-1 border-[#ffffff40]"></div>
                <button className={`${isSigninView ? 'bg-linear-[221deg,#0405ec_15%,transparent_30%] hover:bg-linear-[221deg,#0001ff_20%,transparent_30%]' : 'bg-linear-[221deg,#7804ec_10%,transparent_30%] hover:bg-linear-[221deg,#7f00ff_15%,transparent_30%]'} switch-btn -z-20 absolute size-1/2 bg-transparent right-0 top-0 cursor-pointer rounded-tr-md flex justify-end pt-3 pr-2 sm:pt-6 sm:pr-3`} onClick={handleClick}>
                    {isSigninView && <span className="text-base sm:text-lg text-end">SIGN<br/>UP</span>}
                    {!isSigninView && <span className="text-base sm:text-lg text-end">SIGN<br/>IN</span>}
                </button>
                <h2 className="text-2xl sm:text-4xl mt-5 mb-10 w-fit">{isSigninView ? 'SIGN IN' : 'SIGN UP'}</h2>
                <form onSubmit={resForm} className={`flex flex-col gap-8 sm:gap-10 ${isSigninView ? 'h-[300px] sm:h-[400px] justify-center' : 'h-fit justify-center'}`}>
                    {isSigninView &&
                    <>
                        <Input labelName="EMAIL" labelFor="signInEmail" inputType="text" inputName="signin_email_field" getInputValue={handleInputValue} isSentForm={isFormSubmitted} error={formErrors.signin_email_field}/>
                        <Input labelName="PASSWORD" labelFor="signInPassword" inputType="password" inputName="signin_password_field" getInputValue={handleInputValue} isSentForm={isFormSubmitted} error={formErrors.signin_password_field}/>
                    </>
                    }
                    {!isSigninView &&
                        <>
                            <Input labelName="FULL NAME" labelFor="signUpName" inputType="text" inputName="signup_name_field" getInputValue={handleInputValue} isSentForm={isFormSubmitted} error={formErrors.signup_name_field}/>
                            <Input labelName="EMAIL" labelFor="signUpEmail" inputType="text" inputName="signup_email_field" getInputValue={handleInputValue} isSentForm={isFormSubmitted} error={formErrors.signup_email_field}/>
                            <Input labelName="PASSWORD" labelFor="signUpPassword" inputType="password" inputName="signup_password_field" getInputValue={handleInputValue} isSentForm={isFormSubmitted} error={formErrors.signup_password_field}/>
                            <Input labelName="CONFIRM PASSWORD" labelFor="signUpPasswordCheck" inputType="password" inputName="signup_password_check_field" getInputValue={handleInputValue} isSentForm={isFormSubmitted} error={formErrors.signup_password_check_field}/>
                        </>
                    }
                    <button type="submit" className={`${isSigninView ? '-mb-20 mt-20' : 'mt-3'} border-1 border-[#ffffff80] active:border-white hover:border-white cursor-pointer px-6 py-1 rounded-md bg-zinc-800 mx-auto block w-full sm:w-fit text-lg sm:text-xl self-end`}>{isSigninView ? 'SIGN IN' : 'SIGN UP'}</button>
                </form>
            </div>
        </>
    )
}