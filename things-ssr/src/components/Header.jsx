import React from 'react';

import { connect } from 'react-redux';

import Statistic from './Statistic';

export function Header ({ peoples }) {
	return <header className="all_data--header">
		<div>Now your database have: {peoples.length} items</div>
		<Statistic data={peoples}/>
	</header>
}

export default connect((state) => ({ peoples: state }))(Header)