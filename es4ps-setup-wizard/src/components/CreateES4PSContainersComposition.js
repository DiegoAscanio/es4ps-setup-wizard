import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { genDotEnvFile } from './templates';

const functionPipeLine = {
    downloadES4PSContainersComposition: openFile,
    openFile: loadZip,
    loadZip: makeDotEnvFile,
    makeDotEnvFiles: addDotEnvToZipAndReZip,
    addDotEnvToZipAndReZip: null
}

const downloadES4PSContainersComposition = ({ProcessingConfig, ProcessingConfigHandler}) => {
    let url = process.env.URL + "public/files/es4ps-containers-0.0.0.zip";
    // wait for file to be ready
    fetch(url).then((response) => {
        let nextStep = functionPipeLine[downloadES4PSContainersComposition];
        let zippedFile = response.blob();
        let newConfig  = {
            ...ProcessingConfig,
            zippedFile: zippedFile
        };
        ProcessingConfigHandler(newConfig);
        return nextStep({ProcessingConfig, ProcessingConfigHandler});
    }).catch((error) => {
        console.error("Error downloading ES4PS Containers Composition");
        console.error(error);
    });
};

const openFile = ({ProcessingConfig, ProcessingConfigHandler}) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        let data = event.target.result;
        let newConfig = {
            ...ProcessingConfig,
            openedFile: data
        };
        ProcessingConfigHandler(newConfig);
        let nextStep = functionPipeLine[openFile];
        return nextStep({ProcessingConfig, ProcessingConfigHandler});
    };
    reader.onerror = (error) => {
        console.error("Error opening file");
        console.error(error);
    };
    reader.readAsArrayBuffer(ProcessingConfig.zippedFile);
};

const loadZip = ({ProcessingConfig, ProcessingConfigHandler}) => {
    const JSZip = window.JSZip;
    JSZip.loadAsync(ProcessingConfig.openedFile).then((zip) => {
        let newConfig = {
            ...ProcessingConfig,
            loeadedZip: zip
        };
        ProcessingConfigHandler(newConfig);
        let nextStep = functionPipeLine[loadZip];
        return nextStep({ProcessingConfig, ProcessingConfigHandler});
    }).catch((error) => {
        console.error("Error loading zip file");
        console.error(error);
    });
};

const makeDotEnvFile = ({ProcessingConfig, ProcessingConfigHandler}) => {
    let dotEnv = genDotEnvFile(ProcessingConfig);
    let newConfig = {
        ...ProcessingConfig,
        dotEnv: dotEnv
    };
    ProcessingConfigHandler(newConfig);
    let nextStep = functionPipeLine[makeDotEnvFile];
    return nextStep({ProcessingConfig, ProcessingConfigHandler});
};

const addDotEnvToZipAndReZip = ({ProcessingConfig, ProcessingConfigHandler}) => {
    let zip = ProcessingConfig.loadedZip;
    let dotEnv = ProcessingConfig.dotEnv;
    zip.file('.env', dotEnv);
    // generate updated zip file
    zip.generateAsync({type: "blob"}).then((content) => {
        let newConfig = {
            ...ProcessingConfig,
            updatedZip: {
                filename: "es4ps-containers-configured.zip",
                data: content
            }
        }
        // Aqui o pipeline termina adicionando o arquivo com a configuração
        // .env concluída
        ProcessingConfigHandler(newConfig);
    });
}




const create_es4ps_containers_composition = ({ProcessingConfig, ProcessingConfigHandler}) => {
    // 1. build .env files from ProcessingConfig
    // 2. clone es4ps-containers repo with isomorphic git
    // 3. copy .env files to es4ps-containers folder
    // 4. zip es4ps-containers folder
    // 5. make it available to the user for download

    downloadES4PSContainersComposition({ProcessingConfig, ProcessingConfigHandler});
}

const CreateES4PSContainersComposition = ({ Config, ConfigUpdateHandler }) => {
    const [ProcessingConfig, setProcessingConfig] = useState(Config);
    return (
        <>
            <Helmet>
                <script src="https://unpkg.com/jszip@3.7.1/dist/jszip.js" type="text/javascript"></script>
                <script type="text/javascript">
                    console.log(window.JSZip);
                </script>
            </Helmet>
            { ProcessingConfig.valid && (
                <button 
                    onClick={
                        () => create_es4ps_containers_composition(ProcessingConfig, setProcessingConfig)
                    }
                >
                Create ES4PS<br/>Containers Composition
                </button>
            )}
        </>
    );
}

export default CreateES4PSContainersComposition;
