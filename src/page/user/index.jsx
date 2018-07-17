import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx'

class User extends React.Component {
    constructor(){
        super();
    }

    render() {
        return <div id='page-wrapper'>
          <PageTitle title='用户列表'></PageTitle>
            <div className="row">
                <div className='col-md-12'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default User;