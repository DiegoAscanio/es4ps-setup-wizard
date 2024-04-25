
function UploadCertificate({ onCertificateChange, onKeyChange }) {
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

export default UploadCertificate;
