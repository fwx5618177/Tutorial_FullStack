import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { PeopleFill, CameraVideo, Person } from 'react-bootstrap-icons'; 
import { Link } from 'react-router-dom';

/**
 * 路由信息
 */
export const routes = (...args: any[]): ItemType[]  => {
    
    return [
        {
            key: '/set',
            icon: <PeopleFill />,
            itemIcon: <Person />,
            label: '设置',
            children: [
                {
                    key: '/infos',
                    icon: <Person />,
                    label: <Link to={`set/infos`}>个人信息</Link>,
                }
            ]
        },
        {
            key: '/video',
            icon: <CameraVideo />,
            label: <Link to={`video`}>视频</Link>,
        },
        ]
}
