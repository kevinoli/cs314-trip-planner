import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));
jest.mock('../src/components/App', () => () => 'MockedApp');

describe('entry.js', () => {
    let rootElement;

    // Create a DOM element to render the app into
    beforeEach(() => {
        rootElement = document.createElement('div');
        rootElement.id = 'root';
        document.body.appendChild(rootElement);
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.removeChild(rootElement);
        jest.resetModules(); // Reset the modules to clear require cache
    });

    test('dmorigea: renders the App component without crashing', () => {
        require('../src/entry');

        expect(ReactDOM.render).toHaveBeenCalledTimes(1);
        expect(ReactDOM.render).toHaveBeenCalledWith(expect.anything(), rootElement);
    });

    test('dmorigea: root DOM element exists', () => {
        expect(rootElement).not.toBeNull();
    });
});
