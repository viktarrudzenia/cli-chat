import React from 'react';

export default function Statistic({ data }) {
	return <div>
		<div>
			{/* {console.log('before STATISTIC', data)} */}
			At all data title.length > 5 have: {data.filter(({ title }) => title.length > 5).length} datas
			{/* {console.log('after STATISTIC', data)} */}
		</div>
	</div>;
}