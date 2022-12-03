module.exports = {
    setupFilesAfterEnv: ['<rootDir>/setUpTests.js'],
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src/__tests__'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
        //     '<rootDir>/__mocks__/fileMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
        '\\.(css|less)$': 'identity-obj-proxy',
    }
}