
import { ErrorMessage } from "./ErrorMessage";

const InputField = ({ 
    label, placeholder, inputHandler, validFlag, errorMessage, type="text"
}) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type={type}
            className="form-control"
            placeholder={placeholder}
            onChange = {
                (e) => inputHandler(e.target.value)
            }
        />
        { !validFlag &&
            <ErrorMessage message={errorMessage} />
        }
    </div>
);

const InputFieldGroup = ({ inputFieldsMap }) => {
    return (
        <>
        {
            Object.keys(inputFieldsMap).map((key) => (
            <InputField
                label={inputFieldsMap[key].label}
                placeholder={inputFieldsMap[key].placeholder}
                inputHandler={inputFieldsMap[key].inputHandler}
                validFlag={inputFieldsMap[key].validFlag}
                errorMessage={inputFieldsMap[key].errorMessage}
                type={
                    inputFieldsMap[key].type
                        ? inputFieldsMap[key].type
                        : "text"
                }
            />
            ))
        }
        </>
    )
};

const SelectMode = ({ onChange, selectedMode, selectModeMap }) => (
    <select value={selectedMode} onChange={ e => onChange(e.target.value)}>
        {
            Object.keys(selectModeMap).map((key) => (
                <option value={key}>{selectModeMap[key]}</option>
            ))
        }
    </select>
)

const UploadCertificate = ({ onCertificateChange, onKeyChange }) => {
    const handleFileChanges = (file, handler) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handler(reader.result);
            };
            reader.readAsText(file);
        }
    };
    const handleCertificateChange = (event) => {
        handleFileChanges(event.target.files[0], onCertificateChange);
    };
    const handleKeyChange = (event) => {
        handleFileChanges(event.target.files[0], onKeyChange);
    };

    return (
        <div>
            <div>
                <label>
                    Upload Certificate (.crt, .pem): <br/>
                    <input type="file" onChange={handleCertificateChange} accept=".crt,.pem" />
                </label>
            </div>
            <div>
                <label>
                    Upload Key (.key): <br/>
                    <input type="file" onChange={handleKeyChange} accept=".key" />
                </label>
            </div>
        </div>
    );
}

export {
    InputField,
    InputFieldGroup,
    SelectMode,
    UploadCertificate
};
