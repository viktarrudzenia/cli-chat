import React from 'react';

import { connect } from 'react-redux';

import Statistic from './Statistic';

export function Header ({ peoples }) {
	return <header>
			{console.log('before HEADER', peoples)}
		<span>Peoples: {peoples.length}</span>
		<Statistic peoples={peoples}/>
			{console.log('after HEADER', peoples)}
	</header>
}

export default connect((state) => ({ peoples: state }))(Header)