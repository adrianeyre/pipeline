import { shallow } from 'enzyme';

import Pipeline from '../pipeline';
import IPipelineProps from '../interfaces/pipeline-props';

describe('Pipeline Run', () => {
	it('Should render correctly', () => {
		const defaultProps: IPipelineProps = {};
		const pipeline = shallow(<Pipeline {...defaultProps} />);
		expect(pipeline).toMatchSnapshot();
	});
});