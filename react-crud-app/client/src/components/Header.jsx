import React from 'react';

import { connect } from 'react-redux';

import Statistic from './Statistic';

export function Header ({ peoples }) {
	return <header>
		<span>Now your database have: {peoples.length} items</span>
		<Statistic data={peoples}/>
	</header>
}

export default connect((state) => ({ peoples: state }))(Header)