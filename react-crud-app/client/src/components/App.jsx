import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import List from './List';
import Input from './Input';
import Header from './Header';
import InputForUpdate from './InputForUpdate'

import { expectDeleteByIdFromBD, expectGetAllDataFromBD, expectPostDataToBD, expectUpdateDataByIdFromBD, fetchDataById} from '../actions';

function App ({ expectDeleteByIdFromBD, expectGetAllDataFromBD, peoples , expectPostDataToBD, expectUpdateDataByIdFromBD, fetchDataById}) {
	useEffect(() => {
		expectGetAllDataFromBD();
	}, [expectGetAllDataFromBD]);

	useEffect(() => {
		// console.log('useEffect', peoples);
	}, [peoples]);

	return <div>
		<Header/>
		Post: <Input onEnter={(data) => expectPostDataToBD(data)}/>
		GetById: <Input onEnter={(id) => fetchDataById(id)}/>
		DeleteById: <Input onEnter={(id) => expectDeleteByIdFromBD(id)}/>
		<div>
		UpdateById(id, body): <InputForUpdate onEnter={(id, body) => expectUpdateDataByIdFromBD(id, body)}/>
		</div>
		<List values={peoples} deleteData={expectDeleteByIdFromBD}/>
	</div>;
}

const mapStateToProps = (state) => ({
	peoples: state,
});

const mapDispatchToProps = {
	expectUpdateDataByIdFromBD,
	expectDeleteByIdFromBD,
	fetchDataById,
	expectGetAllDataFromBD,
	expectPostDataToBD,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);















