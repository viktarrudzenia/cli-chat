import React from 'react';

import { connect } from 'react-redux';

import Statistic from './Statistic';

export function Header ({ peoples }) {
	return <header>
		<span>Peoples: {peoples.length}</span>
		<Statistic peoples={peoples}/>
	</header>
}

export default connect((state) => ({ peoples: state }))(Header)