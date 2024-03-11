import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import InputForm from '../../components/InputForm/InputForm';
import { useEffect, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { updateUser } from '../../redux/slides/userSlide';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import Upload from 'antd/lib/upload/Upload';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';
import { WrapperUploadFile } from './style';

const cx = classNames.bind(styles);
function ProfilePage() {
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, rests, access_token);
    });
    const { data, isLoading, isSuccess, isError } = mutation;
    console.log('data', data);

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangeName = (value) => {
        setName(value);
    };
    const handleOnchangePhone = (value) => {
        setPhone(value);
    };
    const handleOnchangeAddress = (value) => {
        setAddress(value);
    };
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
    };
    return (
        <div className={cx('profile__page')}>
            <h1>Information User</h1>
            <Loading isLoading={isLoading}>
                <div className={cx('wrapper__content')}>
                    <div className={cx('wrapper__input')}>
                        <label htmlFor="name">Name</label>
                        <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                            }}
                            textButton={'Update'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </div>
                    <div className={cx('wrapper__input')}>
                        <label htmlFor="email">Email</label>
                        <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                            }}
                            textButton={'Update'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </div>

                    <div className={cx('wrapper__input')}>
                        <label htmlFor="phone">Phone</label>
                        <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                            }}
                            textButton={'Update'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </div>
                    <div className={cx('wrapper__input')}>
                        <label htmlFor="address">Address</label>
                        <InputForm
                            style={{ width: '300px' }}
                            id="address"
                            value={address}
                            onChange={handleOnchangeAddress}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                            }}
                            textButton={'Update'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </div>
                    <div className={cx('wrapper__input')}>
                        <label htmlFor="avatar">Avatar</label>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img
                                src={avatar}
                                style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                                alt="avatar-upload"
                            />
                        )}

                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',
                            }}
                            textButton={'Update'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default ProfilePage;
