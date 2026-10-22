import { useId} from 'react';
import '../styles/TextInput.css';

export default function TextInput ({
    label,
    value,
    id: customId,
    type = "text",
    disabled = false,
    onChange,
    ...rest

}) {
    const generatedId = useId();
    const inputId = customId || generatedId;
    return (
        <div className="TextInputGroup">
            {label && <label htmlFor={inputId}>{label}</label>}
            <input 
                id = {inputId}
                type = {type}
                value= {value}
                disabled = {disabled}
                onChange = {onChange}
                {...rest}
            />
        </div>
    )
}
