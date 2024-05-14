/*
 * With SetupWizard component, this a core component of the application.
 * It is responsible for creating the ES4PS Containers Composition in 
 * a pipeline process defined this way to match js async nature requirements.
 * The following steps, all run in the client side, are executed in the
 * pipeline:
 *     1. Fetch (download) the ES4PS Unconfigured Containers Composition zip 
 *        file from the public files folder of this react app (public/files)
 *        in the user's browser — function downloadES4PSContainersComposition —
 *        and when ready, calls the next function — openFile — in the pipeline.
 *     2. Which — openFile function — reads the downloaded zip file through
 *        a regular FileReader object and when ready, orders to load the
 *        zip file contents — loadZip function — into a dictionary.
 *     3. The loadZip function loads the zip file contents into a dictionary
 *        through zip extraction provided by the JSZip library. The next step
 *        could be executed outside the pipeline — generateDotEnvFile — but
 *        for conviniency and consistency it is kept in the pipeline. For now,
 *        no performance issues were detected in this approach, but in next
 *        releases it could be optimized.
 *     4. The fourth step — generateDotEnvFile — is the step that makes
 *        everything necessary to make a fully functional ES4PS Containers
 *        Composition. It generates the .env file that will be used by the
 *        composition to setup the containers and provide ADDC services.
 *        As said in 3rd step, this fourth step could be detached from the
 *        pipeline. The next step — addDotEnvToZipAndReZip — makes two
 *        things in one. This might be changed in future releases.
 *     5. The final step — addDotEnvToZipAndReZip — adds the generated .env
 *        file to the zip file and re-zips it. The final zip file is then
 *        defined in the ProcessingConfig object and the pipeline is finished.
 *
 *     It is important to say that each step in the pipeline defines a new
 *     object needed by the next step in the ProcessingConfig object.
 */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import genDotEnvFile from './genDotEnvFile';

/* The explanation above gives a good insight about what step in the pipeline
 * process does. For this reason, only the steps that contain unobvious 
 * operations are explained in detail in the comments below, 
 * because all steps are similar in nature: in all of then a call to an async 
 * function is made and when this call is fulfilled, necessary data for the
 * the next step is appended to the ProcessingConfig object and only then the
 * next step is called.
 *
 * For purposes of guarantying consistency between steps, or in other words,
 * that no step was run before the previous one was finished, JS promises
 * with its respective .then() and .catch() methods were used. For now,
 * it is out of the knowledge of the author of this code if async/await
 * calls could perform with the same consistency, since async/await only
 * guarantees consistency for the scopes in which they are defined, as
 * far as the author knows. This is a point to be researched in future releases 
 * and maybe implemented, if possible, to improve code readability.
 *
 * What does downloadES4PSContainersComposition do?
 *    1. It fetches the ES4PS Unconfigured Containers Composition zip file from
 *       the public files folder of this react app (public/files).
 *    2. When the file is ready, it reads the blob from the response, setup the
 *       ProcessingConfig object with the blob and calls the next step in the
 *       pipeline.
 *
 * This kind of processing can be found in similar ways in the other steps
 * of the pipeline.
 */ 

const downloadES4PSContainersComposition = (ProcessingConfig, ProcessingConfigHandler) => {
    let url = process.env.PUBLIC_URL + "/files/es4ps-containers-unconfigured.zip";
    /*
     * Each step in a pipeline function calls an async function to run
     * when the necessary resources are ready. And at the end of each
     * then block, the next step in the pipeline is called.
     */ 
    // wait for file to be ready
    fetch(url).then((response) => {
        response.blob().then((blob) => {
            let zippedFile = blob;
            let newConfig  = {
                ...ProcessingConfig,
                zippedFile: zippedFile
            };
            ProcessingConfigHandler(() => (
                newConfig
            ));
            return functionPipeLine[
                'downloadES4PSContainersComposition'
            ](newConfig, ProcessingConfigHandler);
        }).catch((error) => {
            console.error("Error while processing blob from response");
            console.error(error);
        });;

    }).catch((error) => {
        console.error("Error downloading ES4ALL Containers Composition");
        console.error(error);
    });
    // If the promise was not fulfilled, the catch block is called
    // and the error is logged to the console. Also, the pipeline
    // is stopped anywhere that a step's promise is not fulfilled.
};

const openFile = (ProcessingConfig, ProcessingConfigHandler) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        let data = event.target.result;
        let newConfig = {
            ...ProcessingConfig,
            openedFile: data
        };
        ProcessingConfigHandler(() => (
            newConfig
        ));
        return functionPipeLine[
            'openFile'
        ](newConfig, ProcessingConfigHandler);
    };

    // if for any reason the file could not be read, an error
    // would be logged to the console and the pipeline would be
    // stopped.
    reader.onerror = (error) => {
        console.error("Error opening file");
        console.error(error);
    };

    // here the file fetched in the previous step is read
    // and when ready, reader.onload callback function is called
    // appending the binary data to the ProcessingConfig object
    // and calling the next step in the pipeline
    reader.readAsArrayBuffer(ProcessingConfig.zippedFile);
};

const loadZip = (ProcessingConfig, ProcessingConfigHandler) => {
    // It gets the JSZip object from the window object that was
    // read through the script tag in the Helmet component.
    // This is how we load external libraries that can be used
    // in the browser on react.
    const JSZip = window.JSZip;
    // We call the loadAsync method from JSZip object to load the
    // contents of the zip file that was read in the previous step
    // and when the promise is fulfilled the then block is called
    // appending the loaded zip file to the ProcessingConfig object
    // and calling the next step in the pipeline.
    JSZip.loadAsync(ProcessingConfig.openedFile).then((zip) => {
        let newConfig = {
            ...ProcessingConfig,
            loadedZip: zip
        };
        ProcessingConfigHandler(() => (
            newConfig
        ));
        return functionPipeLine[
            'loadZip'
        ](newConfig, ProcessingConfigHandler);
    }).catch((error) => {
        console.error("Error loading zip file");
        console.error(error);
    }); // if the promise was not fulfilled
};

const makeDotEnvFile = (ProcessingConfig, ProcessingConfigHandler) => {
    // It's assumed through validations from the input fields in the
    // SetupWizard component that the ProcessingConfig object is
    // correctly setup to generate the .env file. Also, genDotEnvFile
    // is synchronous — for now — and don't need to be called in a
    // promise block.
    let dotEnv = genDotEnvFile(ProcessingConfig);
    let newConfig = {
        ...ProcessingConfig,
        dotEnv: dotEnv
    };
    ProcessingConfigHandler(() => (
        newConfig
    ));
    // The next step in the pipeline is called
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
                filename: "es4ps-containers.zip",
                data: content
            },
            finished: true // sets the pipeline as finished
        }
        // Here the pipeline is finished and the updated zip file
        // is set in the ProcessingConfig object.
        ProcessingConfigHandler(() => (
            newConfig
        ));
    }).catch((error) => {
        console.error("Error generating the updated zip file");
        console.error(error);
    }) /* Or an error is logged and the pipeline is stopped if the promise
          was not fulfilled. */
    ;
}


// This is the dictionary map that defines the pipeline steps
// You can see that each step is bound to the next step function,
// except the last step, which is bound to null.
const functionPipeLine = {
    downloadES4PSContainersComposition: openFile,
    openFile: loadZip,
    loadZip: makeDotEnvFile,
    makeDotEnvFile: addDotEnvToZipAndReZip,
    addDotEnvToZipAndReZip: null
}

/* This is a simple button to be rendered in the SetupWizard component when 
   Configs are valid. What does this component do?
     1. Loads the JSZip library in the browser through the Helmet component.
     2. Copy the Config object to the ProcessingConfig object.
     3. Renders a button that when clicked, calls the first step in the
        pipeline process.
     4. For any update in the ProcessingConfig object, an useEffect hook
        is bound to check if the pipeline is finished and if it is, sets
        the composition result in the SetupWizard component.
 */
const CreateES4PSContainersComposition = ({ Config, ConfigUpdateHandler, setCompositionResult }) => {
    const [ProcessingConfig, setProcessingConfig] = useState(Config);
    useEffect (() => {
        ConfigUpdateHandler(() => (
            ProcessingConfig
        ));
        if (ProcessingConfig.finished) {
            setCompositionResult(ProcessingConfig.updatedZip);
        }
    }, [ProcessingConfig]);

    const create_es4ps_containers_composition = () => {
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
