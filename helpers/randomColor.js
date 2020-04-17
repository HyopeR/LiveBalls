const elementArray = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
];

const elementArrayCount = elementArray.length;

const randomColor = () => {

    let createdColor = '#';
    for(let counter = 0; counter < 6; counter++) {
        createdColor += elementArray[Math.floor(Math.random() * elementArrayCount)];
    }

    return createdColor;
};

module.exports = randomColor;
