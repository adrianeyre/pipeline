import { render } from '@testing-library/react';
import Pipeline from '../pipeline';
import IPipelineProps from '../interfaces/pipeline-props';

describe('Pipeline Run', () => {
	it('Should render correctly', () => {
		const defaultProps: IPipelineProps = {};
		const pipeline = render(<Pipeline {...defaultProps} />);
		expect(pipeline).toMatchSnapshot();
	});
});