import React from 'react';
//当组件内部可能会插入其他内容可以开发为容器式组件{this.props.children}
class PageTitle extends React.Component {
    constructor() {
        super();
    }

    componentWillMount(){
        document.title=this.props.title +' - 李成杰'; 
    }

    render() {
        return <div className="row">
            <div className="col-md-12">
                <h1 className='page-header'>{this.props.title}</h1>
                {this.props.children}
            </div>
        </div>

    }
}

export default PageTitle;