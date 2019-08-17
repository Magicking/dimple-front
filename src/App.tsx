import React from 'react';
import FundedList from './FundedList';

import Container from '@material-ui/core/Container';

export class App extends React.Component {
	render() {
		return (
			<Container>
				<p>
					<FundedList
						AddrInfoLink="http://"
						TxInfoLink="http://" />
				</p>
			</Container>
			);
	}
}

export default App;
