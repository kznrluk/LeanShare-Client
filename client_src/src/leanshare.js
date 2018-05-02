import React, { Component } from 'react';
import './leanshare.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';

// TODO: ElectronのAPIと差し替え
function execCopy(string){
    const temp = document.createElement('div');
  
    temp.appendChild(document.createElement('pre')).textContent = string;
  
    const style = temp.style;
    style.position = 'fixed';
    style.left = '-100%';
  
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
  
    const result = document.execCommand('copy');
    document.body.removeChild(temp);

    return result;
  }

const Icon = (props) => {
    return (
        <div className="Icon">
            <i className={`fas ${props.iconName}`}></i>
        </div>
    );
}

class LeanShareClient extends Component {
    constructor(){
        super();
        this.state = {
            uploading : false,
            isHovering: false
        }
        this.handleOnDrop = this.handleOnDrop.bind(this)
        this.toggleMouseOver = this.toggleMouseOver.bind(this)
    }

    handleOnDrop(files){
        this.setState({ uploading : true })
        
        // 並列アップロード
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);

            return axios.post("http://localhost:3001/api/upload/", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(res => {
                execCopy(res.data.url)
            })
        });

        axios.all(uploaders).then(() => {
            setTimeout(() => {
                this.setState({ uploading : false, viewCheck : true });
                setTimeout(() => {
                    this.setState({viewCheck : false})
                }, 1300);
            }, 1500)
        });
    }

    toggleMouseOver(){
        this.setState({ isHovering: this.state.isHovering ? false : true })
    }

    render(){
        const icon = this.state.viewCheck ? "fa-check-circle" : "fa-chevron-circle-up";
        const hoverStatus = this.state.isHovering ? 'hoveron' : 'hoverout';
        const uploadingStatus = this.state.uploading ? 'uploading' : '';

        return (
            <div className="main">
                <Dropzone className={`dndbox ${uploadingStatus}`}
                    onDrop={this.handleOnDrop}
                    onMouseEnter={this.toggleMouseOver}
                    onMouseLeave={this.toggleMouseOver}
                    accept="image/*">
                    <i className={`fas ${icon} ${hoverStatus}`}></i>
                </Dropzone>
                <div className="ButtonsContainer">
                    <Icon iconName='fa-external-link-alt'/>
                    <Icon iconName='fa-cog'/>
                </div>
            </div>
        );
    }
}

export default LeanShareClient;