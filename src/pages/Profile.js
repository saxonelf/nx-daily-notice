import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Button, Card, Input, Space, Select, Flex, Alert } from 'antd';
import styles from './Profile.module.css';
import { UserDataContext } from '../data/userContext';
import { getUserNoticeProfile, updateUserNoticeProfile } from '../data/api';
import { message } from 'antd';

const roomOptions = new Array(9).fill(0).map((_,i) => ({label: `Room 0${i + 1}`,value: `Room 0${i + 1}`})).concat(new Array(51).fill(0).map((_, i) => ({label: `Room ${i + 10}`, value: `Room ${i + 10}`})));
const teacherOptions = ['Jonathon Tredray','Christina England','Jill Haslam','Diana Wilkes','Kevin Faulkner',
'Murray Toohill','Andrew Bolland','Sharon Hines','Tui Bennett','Tess Blockley','Rose Gold','Donne Greentree',
'Lynne Potts','Madalene van dan Heever','Amanda Turner','Dianne Rose','Tammy Frankland','Shane Dennis','Juliet Hamblyn',
'Belinda Hemme','Janine Joyce','Kaajal Lal','Fiona Lysaght','Louise McMenamin','Marc Rowlinson','Kate Thomas','Marius Spencer',
'Mark Jensen','Sylvia Watson','Karin Fenton','Tracey Pickford','Emma Roycroft','Alana Job','Linda Edwards','Nathan Bitting',
'Belinda Hemme','Shane Vallender','Chloe Smith','Sam Ratcliffe','Juliet Hamblyn','Victoria McMillan','Amanda Gummer','Shannon Hale',
'Kate Thomas','Simon Hughes','Reuben Pringle','Lyndon Hohaia','Louise McMenamin','Natasha de Soden','Toni Godfrey','Megan Richardson',
'Hayley Barrowcliffe','Louisa Grant','Marc Rowlinson','Nicola Gray','Hannah Dinley','Fiona Lysaght','Devon Nel','Suzanne Harte',
'Sara Cornthwaite','Jack Waldock','Lerina Jacobs','Byron Ayres','Tom Roberts','Melody O\'Connor','Kel Hartell','Maraea Rameka',
'Kaajal Lal','Sam Hayden','Kaleb McNeil','Karen Terblanche','Scott Washer','Kirsten Bell','Daniel Wyatt','Adam Martin','Kevin Palmer',
'Fiona Landers','Annette Thomas','Kirsten Felix','Janine Joyce','Grace Malone','Logan Geeves','Dominee Williams','Carl Timmis','Shane Dennis',
'Hayley Barrowcliffe','Toni Godfrey','Louisa Grant','Nicola Gray','Amanda Gummer','Mark Jensen','Megan Richardson','Marc Rowlinson','Marius Spencer',
'Sylvia Watson','Jane Edington','Tammy Frankland','Sonia Gobindlal','Anna Lewthwaite','Glenis Martin','Fenella Murdoch','Dianne Rose','Jacqui Spencer',
'Lizette van Zyl','Gary Wood','Carlos De Andrade','Mel Harrison','Grace Haslam','Tania Kotzee','San-Merie Kotzee','Annie Lloyd','Cindy Ramsey','Julia Rudolph',
'Jarryd Russell','Teresa Steele','Samantha Thomson','Tamara Walker','Helen Woodhouse','Melanie Yang','Karen Zane'].map(t => ({
    label: t,
    value: t
}));
const clubOptions = ['NX Sports','AIMS Games','Basketball','Dancesport','Football','Hockey',
'Indoor Football','Netball','Orienteering','Rock Climbing','Rugby','Softball','Waterpolo',
'Music','Arts','Band','Vocal','Dance','Drama','Māori','Kapa Haka'].map(t => ({
    label: t,
    value: t
}));
const subjectOptions = ['Literacy','Math','Science','Social Sciences','Technology', 'Robotics','Engineering & Materials',
'Food Technology','Bio-technology','Drama','Art Tech','Music','Photography','Graphic Design', 'te Reo', 'Digital Technology'].map(t => ({
    label: t,
    value: t
}));

export default function Profile(props) {
    const [messageApi, messageContainer] = message.useMessage();
    const { userInfo, update } = useContext(UserDataContext);
    const [loading, setLoading] = useState(true);
    const [userNoticeProfile, setUserNoticeProfile] = useState({
        interested_classrooms: [],
        interested_clubs: [],
        interested_subjects: [],
        interested_teachers: [],
        other_interests: ''
    });
    const [initLoaded, setInitLoaded] = useState(false);

    const handleUpdate = useCallback(v => {
        setUserNoticeProfile(prev => ({...prev, other_interests: v.target.value}));
    }, []);

    const handleRoomsUpdate = useCallback(v => {
        setUserNoticeProfile(prev => ({...prev, interested_classrooms: v}));
    }, []);

    const handleClubsUpdate = useCallback(v => {
        setUserNoticeProfile(prev => ({...prev, interested_clubs: v}));
    }, []);

    const handleSubjectsUpdate = useCallback(v => {
        setUserNoticeProfile(prev => ({...prev, interested_subjects: v}));
    }, []);

    const handleTeahersUpdate = useCallback(v => {
        setUserNoticeProfile(prev => ({...prev, interested_teachers: v}));
    }, []);

    const handleSave = useCallback(async () => {
        setLoading(true);
        try {
            const data = await updateUserNoticeProfile(userInfo.loginEmail, userInfo.userAPIToken, userNoticeProfile);
            messageApi.success('Your Profile has been updated.', 2);
        } catch(e) {
            messageApi.error(e, 2);
        }
        setLoading(false);
    }, [userInfo, userNoticeProfile]);

    const handleLogout = useCallback(() => {
        update({});
    }, [update]);

    useEffect(() => {
        if (!initLoaded && userInfo?.userAPIToken) {
            setInitLoaded(true);
            getUserNoticeProfile(userInfo.loginEmail, userInfo.userAPIToken).then(data => {
                setUserNoticeProfile({
                    interested_classrooms: !!data?.interested_classrooms ? JSON.parse(data.interested_classrooms) : [],
                    interested_clubs: !!data?.interested_clubs ? JSON.parse(data.interested_clubs) : [],
                    interested_subjects: !!data?.interested_subjects ? JSON.parse(data.interested_subjects) : [],
                    interested_teachers: !!data?.interested_teachers ? JSON.parse(data.interested_teachers) : [],
                    other_interests: data?.other_interests || ''
                });
                setLoading(false);
            }).catch(e => {
                messageApi.error(e, 2);
            });
        }
    }, [userInfo, initLoaded]);
    
    return <div className={styles.container}>
        {messageContainer}
        <Space align="center" direction="vertical" size="large">
            <h1>Hi {userInfo.fullname}</h1>
            <Flex vertical wrap gap='small'>
                <Alert message='You can configure your interested stuff in daily notice here' type='info' />
                <Alert message='You will receive a summary of notices every day in the morning at around 7:30am' type='info' />
            </Flex>
            
            <Card className={styles.configCard} title="I am interested in:">
                <Space className={styles.fullwidth} direction="vertical">
                    <Space.Compact className={styles.fullwidth}>
                        <Select loading={loading} name='classRooms' size='large' allowClear={true} mode='multiple'
                            maxTagCount={4} options={roomOptions} 
                            value={userNoticeProfile.interested_classrooms} 
                            placeholder="Interested Class Rooms" 
                            onChange={handleRoomsUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Select loading={loading} name='clubs' size='large' allowClear={true} maxTagCount={3} 
                            options={clubOptions} mode='multiple' 
                            value={userNoticeProfile.interested_clubs}
                            placeholder="Interested Clubs" onChange={handleClubsUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Select loading={loading} name='teachers' size='large' allowClear={true} maxTagCount={3}
                            options={teacherOptions} mode='multiple' value={userNoticeProfile.interested_teachers}
                            placeholder="Interested Teachers" onChange={handleTeahersUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Select loading={loading} name='subjects' size='large' allowClear={true} maxTagCount={3}
                            options={subjectOptions} mode='multiple' value={userNoticeProfile.interested_subjects}
                            placeholder="Interested Subjects" onChange={handleSubjectsUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Input.TextArea loading={loading} name='otherInterests' value={userNoticeProfile.other_interests} maxLength={255} placeholder="Your other interests" onChange={handleUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.btnContainer}>
                        <Button loading={loading} type="primary" onClick={handleSave}>Save</Button>
                        <Button onClick={handleLogout}>Logout</Button>
                    </Space.Compact>
                </Space>
            </Card>
        </Space>
    </div>;
}