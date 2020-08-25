import React, { Component } from 'react';
import { Table } from 'antd';
import './index.scss';

const { Column } = Table;

class CompositeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signFund: [],
            pageSize: 20,
            pageNo: 1
        }
    }

    componentDidMount() {
        this.getSignFundList();
    }

    async getSignFundList () {
        let res = await this.$post('/signFund', {
            userId: '123',
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo
        })
        let { status, data } = res;
        if(status === 200) {
            console.log(data);
            this.setState({
                signFund: data.data.list
            })
            console.log('list', data.data.list);
            console.log('signFund', this.state.signFund);
        }
    }
    
    render() {
        return (
            <div className="table-content">
                <br/>
                <h3>自选</h3>
                <br/>
                <Table dataSource={this.state.signFund} rowKey={(index) => index}>
                    <Column title="基金" dataIndex="fund_name" key="fund_name" />
                    <Column title="代码" dataIndex="fund_code" key="fund_code" />
                    <Column title="今日" dataIndex="rise_today" key="rise_today" />
                    <Column title="一周" dataIndex="rise_one_week" key="rise_one_week" />
                    <Column title="一个月" dataIndex="rise_one_month" key="rise_one_month" />
                    <Column title="三个月" dataIndex="rise_three_month" key="rise_three_month" />
                </Table>
            </div>
        )
    }
}

export default CompositeIndex;
