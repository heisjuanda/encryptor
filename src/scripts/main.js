import styles from "../styles/styles.css";
import Output from "./noOutput";

window.addEventListener('DOMContentLoaded', () => {

    const inputText = document.getElementById('inputText');

    const ABC = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "ñ",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        " ",
        ".",
        ",",
        ";",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
    ];

    function lowerCase(text) {
        return text.toLowerCase();
    }

    function findLetter(letra) {
        return ABC.indexOf(letra);
    }

    function displacement(mov) {
        while (mov >= ABC.length) {
            mov -= ABC.length;
        }
        return ABC[mov];
    }

    /*const encrypt = (text) => {
        text = lowerCase(text);
        const array = text.split("");
        let result = array.map((letter, pos) => {
            let movement = pos + array.length + findLetter(letter) - 1;
            if (pos === 6) {
            }
            return displacement(movement);
        });
        return result.join("");
    };*/

    async function en(text) {
        text = lowerCase(text);
        const array = text.split("");
        let result = await Promise.all(array.map(async (letter, pos) => {
            let movement = pos + array.length + findLetter(letter) - 1;
            return displacement(movement);
        }));
        return result.join("");
    }

    /*const decrypt = (text) => {
        text = lowerCase(text);
        const array = text.split("");
        let result = array.map((letter, pos) => {
            let movement = findLetter(letter) - array.length - pos + 1;
            while (movement < 0) {
                movement += ABC.length;
            }
            return displacement(movement);
        });
        return result.join("");
    };*/

    async function de(text) {
        text = lowerCase(text);
        const array = text.split("");
        let result = await Promise.all(array.map(async (letter, pos) => {
            let movement = findLetter(letter) - array.length - pos + 1;
            while (movement < 0) {
                movement += ABC.length;
            }
            return displacement(movement);
        }));
        return result.join("");
    }

    function copyText(text) {
        const textToCopy = text;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copiado en el portapapeles');
        });
    }

    /*document.querySelector('.copyBton').addEventListener('click', (text,e) => {
        e.stopPropagation();
        const textToCopy = text;
        navigator.clipboard.writeText(textToCopy).then( () => {
            alert('Copiado en el portapapeles');
        });
    });*/

    document.getElementById('encriptarB').addEventListener('click', e => {
        e.preventDefault();
        if (inputText) {
            en(inputText.value).then(result => {
                if (result.length !== 0) {
                    document.querySelector('.output-section__noInput').innerHTML =
                        `<div class="output-text"><textarea disabled>${result}</textarea></div> <button class="copyBton">Copiar</button>`;
                    document.querySelector(".copyBton").addEventListener('click', () => {
                        const textToCopy = result;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            alert('Copiado en el portapapeles');
                        });
                    });
                } else {
                    const output = new Output();
                }
            });
        } else {
            throw new Error('El texto no se puede encriptar');
        }
    });
    document.getElementById('desencriptarB').addEventListener('click', e => {
        e.preventDefault();
        if (inputText) {
            de(inputText.value).then(result => {
                if (result.length !== 0) {
                    document.querySelector('.output-section__noInput').innerHTML =
                        `<div class="output-text"><textarea disabled>${result}</textarea></div> <button class="copyBton">Copiar</button>`;
                    document.querySelector(".copyBton").addEventListener('click', () => {
                        const textToCopy = result;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            alert('Copiado en el portapapeles');
                        });
                    });
                } else {
                    const output = new Output();
                }
            });
        } else {
            throw new Error('El texto no se puede encriptar');
        }
    });
});