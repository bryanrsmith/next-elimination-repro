import React from 'react';
import _ from 'lodash'

export default ({ value }) => <div>{value}</div>;

export async function getStaticProps() {
	async function getValue() {
		return _.add(30, 7);
	}

	const value = await getValue();

	return {
		props: {
			value,
		},
	};
}

