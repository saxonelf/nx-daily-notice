import React, { useCallback, useContext } from 'react';
import { Button, Card, Input, Space, Select, Flex, Alert } from 'antd';
import styles from './Profile.module.css';
import { UserDataContext } from '../data/userContext';

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
    const { userInfo } = useContext(UserDataContext);
    const handleUpdate = useCallback(() => {

    }, []);
    return <div className={styles.container}>
        <Space align="center" direction="vertical" size="large">
            <h1>Hi {userInfo.fullname}</h1>
            <Flex vertical wrap gap='small'>
                <Alert message='You can configure your interested stuff in daily notice here' type='info' />
                <Alert message='You will receive a summary of notices every day in the morning at around 7:30am' type='info' />
            </Flex>
            
            <Card className={styles.configCard} title="I am interested in:">
                <Space className={styles.fullwidth} direction="vertical">
                    <Space.Compact className={styles.fullwidth}>
                        <Select name='classRooms' size='large' allowClear={true} mode='multiple' maxTagCount={4} options={roomOptions} value={userInfo.interested_classrooms} placeholder="Interested Class Rooms" onChange={handleUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Select name='clubs' size='large' allowClear={true} maxTagCount={3} options={clubOptions} mode='multiple' value={userInfo.interested_clubs} placeholder="Interested Clubs" onChange={handleUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Select name='teachers' size='large' allowClear={true} maxTagCount={3} options={teacherOptions} mode='multiple' value={userInfo.interested_teachers} placeholder="Interested Teachers" onChange={handleUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Select name='subjects' size='large' allowClear={true} maxTagCount={3} options={subjectOptions} mode='multiple' value={userInfo.interested_subjects} placeholder="Interested Subjects" onChange={handleUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.fullwidth}>
                        <Input.TextArea name='otherInterests' value={userInfo.other_interests} maxLength={255} placeholder="Your other interests" onChange={handleUpdate} />
                    </Space.Compact>
                    <Space.Compact className={styles.btnContainer}>
                        <Button type="primary">Save</Button>
                        <Button>Logout</Button>
                    </Space.Compact>
                </Space>
            </Card>
        </Space>
    </div>;
}