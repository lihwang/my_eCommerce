
import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';

//通用富文本编辑器依赖jQ
class RichEditor extends React.Component{
    constructor(){
        super()
    }

    componentDidMount(){
        this.loadEditor();
    }

    componentWillReceiveProps(nextProps){   //
        let detailChange=this.props.defaultDetail!==nextProps.defaultDetail;
        if(!detailChange){
            return;
        }
        this.simditor.setValue(nextProps.defaultDetail);
    }

    loadEditor(){
        let element=this.refs['textarea'];
        this.simditor=new Simditor({
            textarea:$(element),
            defaultValue:this.props.placeholder||'请输入内容',
            upload:{
                url:'/manage/product/richtext_img_upload.do',
                defaultImage:'',
                filKey:'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    //初始化富文本编辑事件
    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            this.props.onValueChange(this.simditor.getValue())
        })
    }
    

    render(){
        return(<div className='rich-editor'>
                <textarea ref='textarea'></textarea>
        </div>)
    }
}

export default RichEditor;
