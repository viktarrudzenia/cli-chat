import React from 'react';

export default function Statistic ({ peoples }) {
	return <div>
		<div>
			Length more then
			10: {peoples.filter(({ value }) => value.length > 10).length}
		</div>
	</div>;
}