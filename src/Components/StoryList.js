import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../index.css'

export default class StoryList extends React.Component {

    render() {
        const selectRow = {
            mode: 'checkbox',
            hideSelectColumn: true,
            selected:[this.props.index],
            className: 'highlight'
            };
        return (
            <BootstrapTable data={ this.props.stories }
                            headerStyle={ { border: 'red 1px solid' } }
                            bodyStyle={ { border: 'green 1px solid' } }
                            selectRow={selectRow}>
                <TableHeaderColumn dataField='id' isKey={ true } hidden={true} dataAlign='center'>Story</TableHeaderColumn>
                <TableHeaderColumn width='80%' dataAlign='left' dataField='story'>Story</TableHeaderColumn>
                <TableHeaderColumn width='20%' dataAlign='center' dataField='avg'>Avg.</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}