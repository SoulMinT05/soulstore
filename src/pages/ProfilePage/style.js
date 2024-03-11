import { Upload } from 'antd';
import styled from 'styled-components';

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload ant-upload-select ant-upload-select-text {
        display: none;
        height: 0 !important;
        width: 0;
    }
    & .ant-upload-list-item ant-upload-list-item-error ant-upload-list-item-list-type-text {
        display: none;
        height: 0 !important;
        width: 0;
    }
    & .ant-upload-list ant-upload-list-text {
        display: none;
        height: 0 !important;
        width: 0;
    }
    & .ant-upload-list-item-info {
        display: none;
        margin-top: 0;
    }
    & .ant-upload-list ant-upload-list-text {
        display: none;
    }
`;
