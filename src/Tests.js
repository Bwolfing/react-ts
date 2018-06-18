import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const tsFileContext = require.context("./", true, /\.spec\.ts$/);
const tsxFileContext = require.context("./", true, /\.spec\.tsx$/);
tsFileContext.keys().map(tsFileContext);
tsxFileContext.keys().map(tsxFileContext);