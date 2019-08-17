import React from 'react';
import { Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	CircularProgress,
} from '@material-ui/core';
import { Check, Error } from '@material-ui/icons';
import { Blockie } from 'rimble-ui';

interface Props {
	AddrInfoLink: string,
	TxInfoLink: string,
}

type TxState = {
	Txs: Array<Transaction>,
}

enum TxStatus {
	InFlight = 1,
	Included,
	Errored,
}

class Transaction {
	Address: string;
	TransactionHash: string;
	Amount: number;
	Status: TxStatus;

	constructor(addr: string, txhash: string, amount: number, status: TxStatus) {
		this.Address = addr;
		this.TransactionHash = txhash;
		this.Amount = amount;
		this.Status = status;
	}
}

export class FundedList extends React.Component<Props, TxState> {
	state: TxState = {
		Txs: [ 
			new Transaction("0x61201ee3bc5b988d7c616870fa0381200aa9a11c", "0x2e1f2a077af7f45f0398f3032e8cbf28dc658157faeb7dda06a62053c8a47495", 10000, TxStatus.InFlight),
			new Transaction("0x61201ee3bc5b988d7c616870fa0381200aa9a11c", "0x1e1f2a077af7f45f0398f3032e8cbf28dc658157faeb7dda06a62053c8a47495", 10000, TxStatus.Included),
			new Transaction("0x61201ee3bc5b988d7c616870fa0381200aa9a11c", "0x3e1f2a077af7f45f0398f3032e8cbf28dc658157faeb7dda06a62053c8a47495", 10000, TxStatus.Errored),
		],
	};

	render() {
		const { AddrInfoLink } = this.props;
		const { Txs } = this.state;
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>&nbsp;</TableCell>
						<TableCell align="right">Address</TableCell>
						<TableCell align="right">Transaction</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell align="right">Validation</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				{Txs.map(row => (
					<TableRow key={row.TransactionHash}>
						<TableCell component="th" scope="row"><Blockie opts={{seed: row.Address, scale: 2}}/></TableCell>
						<TableCell align="right">{row.Address}</TableCell>
						<TableCell align="right">{row.TransactionHash}</TableCell>
						<TableCell align="right">{row.Amount}</TableCell>
						<TableCell align="center">{(() => {switch(row.Status) {
							case TxStatus.InFlight:
								return (<CircularProgress />);
							case TxStatus.Included:
								return (<Check />);
							case TxStatus.Errored:
								return (<Error />);
						}})()}
						</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
		);
	}
}

export default FundedList;
