import React from 'react';

export default ({ value }) => <div>{value}</div>;

export async function getStaticProps() {
	const value = 37;

	return {
		props: {
			value,
		},
	};
}
