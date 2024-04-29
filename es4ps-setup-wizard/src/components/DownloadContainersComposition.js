import { useState, useEffect } from 'react';

const DownloadContainersComposition = ({ zipfile }) => {
    const [downloadLink, setDownloadLink] = useState(null);
    const [filename, setFilename] = useState(null);
    
    useEffect(() => {
        const filename = zipfile.filename;
        const downloadLink = window.URL.createObjectURL(zipfile.data);
        setDownloadLink(downloadLink);
        setFilename(filename);
    
        return () => {
        URL.revokeObjectURL(downloadLink);
        };
    }, [zipfile]);
    
    return (
        <div class="form-group">
            <a href={downloadLink} download={filename}>
                Download Containers Composition
            </a>
        </div>
    );
}

export default DownloadContainersComposition;
