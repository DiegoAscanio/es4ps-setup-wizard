import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { genDotEnvFile } from './templates';

const downloadES4PSContainersComposition = (ProcessingConfig, ProcessingConfigHandler) => {
    let url = process.env.PUBLIC_URL + "/files/es4ps-containers-unconfigured.zip";
    // wait for file to be ready
    fetch(url).then((response) => {
        response.blob().then((blob) => {
            let zippedFile = blob;
            let newConfig  = {
                ...ProcessingConfig,
                zippedFile: zippedFile
            };
            ProcessingConfigHandler(newConfig);
            return functionPipeLine[
                'downloadES4PSContainersComposition'
            ](newConfig, ProcessingConfigHandler);
        }).catch((error) => {
            console.error("Error while processing blob from response");
            console.error(error);
        });;

    }).catch((error) => {
        console.error("Error downloading ES4PS Containers Composition");
        console.error(error);
    });
};

const openFile = (ProcessingConfig, ProcessingConfigHandler) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        let data = event.target.result;
        let newConfig = {
            ...ProcessingConfig,
            openedFile: data
        };
        ProcessingConfigHandler(newConfig);
        return functionPipeLine[
            'openFile'
        ](newConfig, ProcessingConfigHandler);
    };
    reader.onerror = (error) => {
        console.error("Error opening file");
        console.error(error);
    };
    reader.readAsArrayBuffer(ProcessingConfig.zippedFile);
};

const loadZip = (ProcessingConfig, ProcessingConfigHandler) => {
    const JSZip = window.JSZip;
    JSZip.loadAsync(ProcessingConfig.openedFile).then((zip) => {
        let newConfig = {
            ...ProcessingConfig,
            loadedZip: zip
        };
        ProcessingConfigHandler(newConfig);
        return functionPipeLine[
            'loadZip'
        ](newConfig, ProcessingConfigHandler);
    }).catch((error) => {
        console.error("Error loading zip file");
        console.error(error);
    });
};

const makeDotEnvFile = (ProcessingConfig, ProcessingConfigHandler) => {
    let dotEnv = genDotEnvFile(ProcessingConfig);
    let newConfig = {
        ...ProcessingConfig,
        dotEnv: dotEnv
    };
    ProcessingConfigHandler(newConfig);
    return functionPipeLine[
        'makeDotEnvFile'
    ](newConfig, ProcessingConfigHandler);
};

const addDotEnvToZipAndReZip = (ProcessingConfig, ProcessingConfigHandler) => {
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
            },
            finished: true
        }
        // Aqui o pipeline termina adicionando o arquivo com a configuração
        // .env concluída
        ProcessingConfigHandler(newConfig);
    });
}

const functionPipeLine = {
    downloadES4PSContainersComposition: openFile,
    openFile: loadZip,
    loadZip: makeDotEnvFile,
    makeDotEnvFile: addDotEnvToZipAndReZip,
    addDotEnvToZipAndReZip: null
}


const CreateES4PSContainersComposition = ({ Config, ConfigUpdateHandler, setCompositionResult }) => {
    const [ProcessingConfig, setProcessingConfig] = useState(Config);
    useEffect (() => {
        ConfigUpdateHandler(ProcessingConfig);
        if (ProcessingConfig.finished) {
            setCompositionResult(ProcessingConfig.updatedZip);
        }
    }, [ProcessingConfig]);

    const create_es4ps_containers_composition = () => {
       // 1. build .env files from ProcessingConfig
       // 2. clone es4ps-containers repo with isomorphic git
       // 3. copy .env files to es4ps-containers folder
       // 4. zip es4ps-containers folder
       // 5. make it available to the user for download
       downloadES4PSContainersComposition(ProcessingConfig, setProcessingConfig);
    }

    return (
        <>
            <Helmet>
                <script src="https://unpkg.com/jszip@3.7.1/dist/jszip.js" type="text/javascript"></script>
            </Helmet>
            <div class="form-group">
                <button 
                    onClick={
                        () => create_es4ps_containers_composition()
                    }
                >
                Create ES4PS<br/>Containers Composition
                </button>
            </div>
        </>
    )
}

export default CreateES4PSContainersComposition;
