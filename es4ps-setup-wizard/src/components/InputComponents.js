/*
 * There are defined four components in this file:
 * - InputField: A single input field with label, placeholder, inputHandler,
 *               validFlag, errorMessage, and type.
 *               - This component is defined to be the most generic as 
 *                 possible in order to work with any text input 
 *                 needed by RabbitMQ, Samba or Django setup components.
 *                 It receives an error flag (with a message)
 *                 to show an error message when the input is invalid.
 *                 InputHandler is a function that will set the input value
 *                 to its respective state. Label informs to the user what
 *                 the input is for. Placeholder is a hint to the user about
 *                 what to input. Type is the type of the input, default is
 *                 text and the other option supported in the current release
 *                 is password.
 *                 In future releases this component maybe will be updated to
 *                 support more types of inputs or broken into more specific
 *                 components.
 * - InputFieldGroup: A group of input fields. It receives the dictionary 
 *                    inputFieldsMap, that must be defined in each of the
 *                    Setup components (RabbitMQ, Samba and Django currently).
 *                    This dictionary map states for Setup needed parameters 
 *                    to the needed InputField component necessary parameters.
 *                    So if you're willing to define new parameters for 
 *                    configuration you must consider that will be necessary
 *                    to define at least its label, placeholder, inputHandler, 
 *                    validFlag and errorMessage for the respective state
 *                    key in the inputFieldsMap.
 *
 *                    How does it work?
 *                      - It iterates through the keys of the inputFieldsMap
 *                        and for each key it renders an InputField component
 *                        for it.
 *
 *                    In current release the InputFieldGroup renders only
 *                    InputField components, but in future releases it may be 
 *                    updated to support more types of inputs.
 * - SelectMode: A select input field that receives an onChange function to
 *               set the selected mode to its respective state. It also
 *               receives the selectedMode state, a default value for the
 *               select input, and the selectModeMap, a dictionary that maps
 *               the select options to its respective values.
 *               Again it is build to be the most generic as possible.
 *               To use this component, the user only needs to define the
 *               selectModeMap and the selectedMode state in the Setup component.
 *               Not used in the current release, because during the development
 *               process it was decided to use only AllInOne setup mode that
 *               states that the user must define all the parameters for the
 *               setup. This simplified the process and made possibile to reach
 *               the MVP, but in next releases this component will certainly be
 *               used as multiple setup modes will be available.
 * - UploadCertificate: A component that exists to allow an user to update an
 *                      existing certificate and its private key. It receives
 *                      two handlers from the parent component to update the
 *                      certificate and the key values if the user choses
 *                      to upload its own certificates, i.e. if the user
 *                      generated certificates for its domain address through
 *                      certibot Let's Encrypt CA service. But in the current
 *                      development stage it added a lot of complexity that
 *                      would inviabilize the MVP, so it was decided to not
 *                      use it. In future releases it will be used to allow
 *                      the user to upload its own certificates signed by
 *                      a valid CA service in order to enhance the final user
 *                      experience by not showing the browser warning about
 *                      the certificate not being signed by a valid CA.
 *
 *                      How it works?
 *                          - It is two file input fields that receives two 
 *                          files and reads it as text. Then it calls the 
 *                          handler function to update the certificate or 
 *                          the key values with the values read from the file.
 *                          
 */

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
