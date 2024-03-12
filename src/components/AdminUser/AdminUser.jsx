import { Button } from 'antd';
import { WrapperHeader } from './style';
import { PlusCircleFilled } from '@ant-design/icons';

function AdminUser() {
    return (
        <div>
            <WrapperHeader>Manage User</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '60px', width: '128x', borderRadius: '6px', borderStyle: 'dashed' }}>
                    Add User
                    <PlusCircleFilled style={{ fontSize: '24px' }} />
                </Button>
            </div>
        </div>
    );
}

export default AdminUser;
