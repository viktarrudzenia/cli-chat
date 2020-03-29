import React from 'react';

export default function Statistic({ data }) {
	return <div>
		<div className="all_data--statistic">
			At all data body.length > 5 have: {data.filter(({ body }) => body.length > 5).length} items
		</div>
	</div>;
}