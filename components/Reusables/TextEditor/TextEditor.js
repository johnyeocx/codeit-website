import Editor from "@monaco-editor/react";
import Axios from 'axios';
import spinner from './spinner.svg';
import React, { useState, useEffect } from 'react'
import RippleButton from "../RippleButton/RippleButton";
import styles from '../../../styles/Components/TextEditor.module.scss'
import rippleStyles from '../../../styles/Components/RippleButton.module.scss';
import { endpoint } from "../../../api/api";

function TextEditor() {
    // State variable to set users source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set editors default language
    const [userLang, setUserLang] = useState("python");

    // State variable to set editors default theme
    const [userTheme, setUserTheme] = useState("vs-dark");

    // State variable to set editors default font size
    const [fontSize, setFontSize] = useState(15);

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");

    const [loading, setLoading] = useState(false);

    let [windowWidth, setWindowWidth] = useState(window.innerWidth);
    let [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleScreenResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleScreenResize);
        return () => {
            window.removeEventListener('resize', handleScreenResize);
        }
    }, [])


    const options = {
        fontSize: 14,
        quickSuggestions: false,
        fontFamily: 'Monaco'
    }

    function compile() {
        setLoading(true);
        if (userCode === ``) {
            return
        }

        // Post request to compile endpoint
        Axios.post(`${endpoint}/compile`, {
            code: userCode,
            language: userLang,
            input: userInput
        }).then((res) => {
            console.log(res.data)
            setUserOutput(res.data.output);
        }).then(() => {
            setLoading(false);
        })
    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div className={styles.container}>
            <div className={styles.top} style={{
                width: windowWidth * 0.4
            }}>
                <p style={{
                    fontSize: '12px',
                    color: 'white',
                    fontWeight: '600',
                    paddingLeft: '15px',
                    margin: 0
                }}>hello.py</p>
            </div>
            <Editor
                id="monaco-editor"
                options={options}
                height={windowHeight * 0.45}
                width={windowWidth * 0.4}
                theme={userTheme}
                language={userLang}
                defaultLanguage="python"
                defaultValue={`# Run your first program!
# Type print('Hello World') below 
`}
                onChange={(value) => { setUserCode(value) }}
            />

            <div className={styles.bottom} style={{
                width: innerWidth * 0.4
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ margin: 0 }}>Output: </h4>
                    {userOutput ? userOutput.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    )) : (
                        <p>{ }</p>
                    )
                    }
                </div>
                <div className={styles.runButtonContainer} >
                    {/* <RippleButton text="Run" primary
                        onClick={(e) => compile()}
                    /> */}
                    <button
                        className={
                            loading ?
                                `${rippleStyles.rippleButtonSubmitting} ${rippleStyles.rpPrimary}` :
                                `${rippleStyles.rippleButton} ${rippleStyles.rpPrimary}`
                        }
                        onClick={() => compile()}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {
                            loading ? (
                                <div className="spinner">Hello</div>

                            ) : (
                                <>Run</>
                            )
                        }

                    </button>
                </div>

            </div>

        </div>
    )
}

export default TextEditor