import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const tsxFileContext = require.context("./", true, /\.spec\.ts(|x)$/);
tsxFileContext.keys().forEach(tsxFileContext);